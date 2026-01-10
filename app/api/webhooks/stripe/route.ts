import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_build_mock_key', {
    apiVersion: '2024-12-18.acacia' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
    if (!endpointSecret) {
        return NextResponse.json(
            { error: 'Stripe Webhook Secret is missing' },
            { status: 500 }
        );
    }

    const body = await request.text();
    const sig = (await headers()).get('stripe-signature');

    let event: Stripe.Event;

    try {
        if (!sig) throw new Error("No signature");
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            console.log(`Payment successful for session ID: ${session.id}`);
            // Fulfill the order...
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
