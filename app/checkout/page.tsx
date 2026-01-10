"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/contexts/CartContext";
import { useUser } from "@/lib/contexts/UserContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ArrowLeft, CreditCard, Wallet, Lock } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
    const { items, total, clearCart, itemCount } = useCart();
    const { addOrder } = useUser();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[--color-primary-bg]">
                <h1 className="text-2xl font-bold mb-4 text-[--color-text-primary] text-center">Your cart is empty</h1>
                <Link href="/shop">
                    <Button variant="primary">Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            const data = await response.json();

            if (data.url) {
                // Create new order record locally before redirecting (optional, or rely on webhook)
                addOrder({
                    id: `ORD-${Date.now().toString().slice(-6)}`,
                    date: new Date().toISOString(),
                    status: "processing",
                    total: total,
                    items: itemCount
                });
                clearCart();
                window.location.href = data.url;
            } else {
                console.error('Checkout failed:', data.error);
                alert('Checkout failed. Please try again.');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsProcessing(false);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-[--color-primary-bg] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Link href="/cart" className="inline-flex items-center gap-2 text-[--color-text-secondary] hover:text-[--color-accent-cyan] mb-8">
                    <ArrowLeft size={20} /> Back to Cart
                </Link>

                <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                    {/* Checkout Form */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[--color-text-primary] mb-6">Shipping Information</h2>
                            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="First Name" required />
                                    <Input placeholder="Last Name" required />
                                </div>
                                <Input placeholder="Address" required />
                                <Input placeholder="Apartment, suite, etc. (optional)" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="City" required />
                                    <Input placeholder="Postal Code" required />
                                </div>
                                <Input placeholder="Phone (optional)" />
                            </form>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-[--color-text-primary] mb-6">Payment Method</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("card")}
                                    className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${paymentMethod === "card"
                                        ? "border-[--color-accent-cyan] bg-[--color-accent-cyan]/10 text-[--color-accent-cyan]"
                                        : "border-[--color-border] text-[--color-text-secondary] hover:border-[--color-accent-cyan]/50"
                                        }`}
                                >
                                    <CreditCard size={24} />
                                    <span className="font-semibold">Credit Card</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("upi")}
                                    className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${paymentMethod === "upi"
                                        ? "border-[--color-accent-cyan] bg-[--color-accent-cyan]/10 text-[--color-accent-cyan]"
                                        : "border-[--color-border] text-[--color-text-secondary] hover:border-[--color-accent-cyan]/50"
                                        }`}
                                >
                                    <Wallet size={24} />
                                    <span className="font-semibold">UPI / Netbanking</span>
                                </button>
                            </div>

                            {paymentMethod === "card" && (
                                <div className="mt-4 p-4 border border-[--color-border] rounded-lg bg-[--color-bg-secondary] space-y-4">
                                    <Input placeholder="Card Number" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="MM / YY" />
                                        <Input placeholder="CVC" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mt-12 lg:mt-0">
                        <div className="bg-[--color-bg-secondary] border border-[--color-border] rounded-xl p-6 lg:p-8 sticky top-24">
                            <h2 className="text-xl font-bold text-[--color-text-primary] mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-[--color-text-primary] line-clamp-1">{item.name}</h3>
                                            <p className="text-xs text-[--color-text-secondary]">Size: {item.size}</p>
                                            <p className="text-sm font-bold text-[--color-text-primary] mt-1">
                                                {formatPrice(item.price)} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 border-t border-[--color-border] pt-4 mb-6">
                                <div className="flex justify-between text-[--color-text-secondary]">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-[--color-text-secondary]">
                                    <span>Shipping</span>
                                    <span className="text-[--color-accent-cyan]">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-[--color-text-primary] pt-2">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                variant="primary"
                                size="xl"
                                className="w-full flex items-center justify-center gap-2"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    "Processing..."
                                ) : (
                                    <>
                                        <Lock size={18} /> Pay {formatPrice(total)}
                                    </>
                                )}
                            </Button>

                            <p className="text-center text-xs text-[--color-text-secondary] mt-4">
                                Secure Payment by Stripe (Demo Mode)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
