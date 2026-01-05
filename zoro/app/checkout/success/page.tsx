import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-green-500 w-10 h-10" />
            </div>

            <h1 className="text-3xl font-bold text-[--color-text-primary] mb-4">
                Order Confirmed!
            </h1>

            <p className="text-[--color-text-secondary] max-w-md mb-8">
                Thank you for your purchase. Your order has been received and is processing. You will receive an email confirmation shortly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/account">
                    <Button variant="outline">View Order</Button>
                </Link>
                <Link href="/shop">
                    <Button variant="primary">Continue Shopping</Button>
                </Link>
            </div>
        </div>
    );
}
