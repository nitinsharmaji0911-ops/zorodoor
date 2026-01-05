import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <XCircle className="text-red-500 w-10 h-10" />
            </div>

            <h1 className="text-3xl font-bold text-[--color-text-primary] mb-4">
                Payment Canceled
            </h1>

            <p className="text-[--color-text-secondary] max-w-md mb-8">
                Your payment was canceled and you have not been charged. If you encountered an issue, please try again or contact support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/cart">
                    <Button variant="primary">Return to Cart</Button>
                </Link>
                <Link href="/contact">
                    <Button variant="outline">Contact Support</Button>
                </Link>
            </div>
        </div>
    );
}
