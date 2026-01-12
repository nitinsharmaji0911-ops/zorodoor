import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_build_mock_key', {
    apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(request: Request) {
    // Get authenticated user
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const { items } = await request.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: 'No items provided' },
                { status: 400 }
            );
        }

        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
        let totalAmount = 0;

        // Verify stock and calculate total (needed for both Mock and Real)
        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId }
            });

            if (!product) {
                return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 404 });
            }

            if (product.stock < item.quantity) {
                return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 409 });
            }

            const image = product.images && product.images.length > 0 ? product.images[0] : '';

            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        images: image.startsWith('http') ? [image] : [],
                        metadata: { productId: product.id }
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: item.quantity,
            });

            totalAmount += product.price * item.quantity;
        }

        // --- MOCK MODE CHECK ---
        // --- MOCK MODE CHECK ---
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        // Check if key is missing, empty, or explicitly the build mock key
        const isMockMode = !stripeKey || stripeKey.trim() === "" || stripeKey === "sk_test_build_mock_key" || stripeKey.includes("mock");

        if (isMockMode) {
            console.log("⚠️ MOCK CHECKOUT TRIGGERED (No valid Stripe Key found)");

            // Create Order Directly
            await prisma.$transaction(async (tx: any) => {
                const order = await tx.order.create({
                    data: {
                        userId: session.user.id,
                        total: totalAmount,
                        status: "PAID",
                        stripeSessionId: `mock_session_${Date.now()}`,
                        address: JSON.stringify({ line1: "Mock Address", city: "Mock City", country: "US" }),
                        items: {
                            create: items.map((item: any) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                                price: lineItems.find((li: any) => li.price_data?.product_data?.metadata?.productId === item.productId)?.price_data?.unit_amount ?? 0 / 100
                            }))
                        }
                    }
                });

                // Decrement Stock
                for (const item of items) {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: { stock: { decrement: item.quantity } }
                    });
                }
            });

            // Simulate Network Delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            return NextResponse.json({
                url: `${request.headers.get('origin')}/checkout/success?session_id=mock_session`,
                mock: true
            });
        }

        // --- REAL STRIPE FLOW ---
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/checkout/cancel`,
            client_reference_id: session.user.id,
            metadata: {
                // Metadata mapped in webhook
            },
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB'],
            }
        });

        return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url });

    } catch (error: any) {
        console.error('Checkout Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
