import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = body.amount; // Expecting amount in INR

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    // Initialize Razorpay
    // Note: In production, these should be securely stored in .env
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_secret',
    });

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ 
      orderId: order.id, 
      currency: order.currency, 
      amount: order.amount 
    });
  } catch (error) {
    console.error('Razorpay Error:', error);
    return NextResponse.json({ error: 'Payment initialization failed.' }, { status: 500 });
  }
}
