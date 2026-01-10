import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_build_mock_key', {
    apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(request: Request) {
    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json(
            { error: 'Stripe Secret Key is missing' },
            { status: 500 }
        );
    }

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

        const lineItems = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId }
            });

            if (!product) {
                return NextResponse.json(
                    { error: `Product not found: ${item.name}` },
                    { status: 404 }
                );
            }

            // Check stock
            if (product.stock < item.quantity) {
                return NextResponse.json(
                    { error: `Insufficient stock for ${product.name}` },
                    { status: 409 }
                );
            }

            // Parse images to get the first one for Stripe
            const images = JSON.parse(product.images);
            const image = images && images.length > 0 ? images[0] : '';

            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        images: image.startsWith('http') ? [image] : [],
                        metadata: {
                            productId: product.id
                        }
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: item.quantity,
            });
        }

        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/checkout/cancel`,
            client_reference_id: session.user.id,
            metadata: {
                // Additional global metadata if needed
            },
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB'],
            }
        });

        return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
