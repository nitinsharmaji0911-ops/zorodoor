import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-12-18.acacia" as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
    if (!process.env.STRIPE_SECRET_KEY || !endpointSecret) {
        console.warn("Stripe keys missing for webhook.");
        return NextResponse.json({ error: "Missing keys" }, { status: 500 });
    }

    const body = await req.text();
    const sig = (await headers()).get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // 1. Retrieve the session with line items to know what was bought
        const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items']
        });

        const lineItems = expandedSession.line_items?.data || [];
        const userId = session.client_reference_id; // Get User ID from session

        // 2. Check if we already processed this session (Idempotency)
        const existingOrder = await prisma.order.findUnique({
            where: { stripeSessionId: session.id }
        });

        if (existingOrder) {
            return NextResponse.json({ received: true });
        }

        try {
            // 3. Create the order
            // We need to map Stripe line items to our products via metadata!
            // The metadata is on the PRICE or PRODUCT object in Stripe, but we passed it in product_data.
            // It resides in `line_item.price.product_metadata` usually, but simpler is to fetching the product logic.
            // Wait, `line_items.data` has `price.product` (ID).
            // Let's rely on retrieving the LINE ITEMS which contain the `price.product` expanded? No.
            // We passed `metadata` in `product_data`. This attaches it to the PRODUCT object in Stripe.
            // Accessing it via `line_item.price.product` requires expanding `line_items.data.price.product`.

            // Actually, let's fetch it cleanly.
            const itemsToCreate = [];

            for (const item of lineItems) {
                // We need the productId we sent. 
                // `item.price.product` is the Stripe Product Object ID or the object itself if expanded.
                // We didn't expand `line_items.data.price.product`.
                // So we might not have the metadata here easily without another call?
                // Actually, we can attach metadata to the PRICE object or just trust the name? No.

                // BETTER APPROACH: Use `custom_fields` or just trust the `client_reference_id` 
                // and assume we can find the matching product by name? No, unsafe.

                // Correct way: When creating line_items, attach metadata to `price_data`. 
                // BUT price_data.metadata requires creating a new Price object.
                // We put it in `product_data.metadata`. This means it's on the Stripe Product.
                // So we must expand `line_items.data.price.product`.
            }

        } catch (e) {
            // ...
        }

        // RE-THINKING FOR SIMPLICITY:
        // We already have the transaction. We can just create the Order. 
        // Is mapping back to Product ID strictly necessary for the OrderItem logic?
        // Yes, because `OrderItem` has `productId` FK.

        // workaround: We will loop and find products by NAME if metadata is hard to reach, 
        // OR we just do the fetch.

        // Let's do the fetch for the expanded items.
        const sessionWithProductParams = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items.data.price.product']
        });
        const finalItems = sessionWithProductParams.line_items?.data || [];

        await prisma.$transaction(async (tx: any) => {
            const order = await tx.order.create({
                data: {
                    stripeSessionId: session.id,
                    userId: userId || "",
                    total: session.amount_total ? session.amount_total / 100 : 0,
                    status: "PAID",
                    address: JSON.stringify((session as any).shipping_details || {}),
                    items: {
                        create: finalItems.map((item: any) => {
                            const product = item.price?.product as Stripe.Product;
                            const internalProductId = product.metadata.productId;

                            if (!internalProductId) throw new Error("Product metadata missing");

                            return {
                                quantity: item.quantity || 1,
                                price: (item.price?.unit_amount || 0) / 100,
                                productId: internalProductId
                            };
                        })
                    }
                }
            });

            // Decrement Stock
            for (const item of finalItems) {
                const product = item.price?.product as Stripe.Product;
                const internalProductId = product.metadata.productId;

                if (internalProductId) {
                    await tx.product.update({
                        where: { id: internalProductId },
                        data: {
                            stock: { decrement: item.quantity || 1 }
                        }
                    });
                }
            }
        });

    }

    return NextResponse.json({ received: true });
}
