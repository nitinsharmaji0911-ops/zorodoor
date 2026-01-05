"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCart } from "@/lib/contexts/CartContext";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
    const { items, updateQuantity, removeItem, applyDiscount, discount } =
        useCart();
    const { showToast } = useToast();
    const [discountCode, setDiscountCode] = useState("");

    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const discountAmount = subtotal * discount;
    const deliveryFee = subtotal > 100 ? 0 : 10;
    const total = subtotal - discountAmount + deliveryFee;

    const handleApplyDiscount = (e: React.FormEvent) => {
        e.preventDefault();
        const success = applyDiscount(discountCode);
        if (success) {
            showToast("Discount applied successfully!", "success");
            setDiscountCode("");
        } else {
            showToast("Invalid discount code", "error");
        }
    };

    if (items.length === 0) {
        return (
            <div className="bg-[--color-primary-bg] min-h-screen py-20">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-[--color-text-primary] mb-4">
                        YOUR CART IS EMPTY
                    </h1>
                    <p className="text-[--color-text-secondary] mb-8">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link href="/shop">
                        <Button variant="primary" size="lg">
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[--color-primary-bg] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-[--color-text-primary] mb-8">
                    SHOPPING CART
                </h1>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-[--color-primary-bg-secondary] border border-[--color-border] rounded-lg overflow-hidden">
                            <div className="p-6 border-b border-[--color-border]">
                                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-[--color-text-secondary] uppercase">
                                    <div className="col-span-6">Product</div>
                                    <div className="col-span-2 text-center">Size</div>
                                    <div className="col-span-2 text-center">Quantity</div>
                                    <div className="col-span-2 text-right">Total</div>
                                </div>
                            </div>

                            <div className="divide-y divide-[--color-border]">
                                {items.map((item) => (
                                    <div
                                        key={`${item.productId}-${item.size}`}
                                        className="p-6"
                                    >
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            {/* Product Info */}
                                            <div className="col-span-6 flex gap-4">
                                                <div className="relative w-24 h-24 bg-[--color-primary-bg] border border-[--color-border] rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-[--color-text-primary] font-semibold mb-1">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-[--color-text-secondary]">
                                                        {formatPrice(item.price)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Size */}
                                            <div className="col-span-2 text-center">
                                                <span className="px-3 py-1 bg-[--color-primary-bg] border border-[--color-border] rounded text-sm text-[--color-text-secondary]">
                                                    {item.size}
                                                </span>
                                            </div>

                                            {/* Quantity */}
                                            <div className="col-span-2">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.productId,
                                                                item.size,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        className="p-1 hover:text-[--color-accent-cyan] transition-colors"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-8 text-center text-[--color-text-primary]">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.productId,
                                                                item.size,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        className="p-1 hover:text-[--color-accent-cyan] transition-colors"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Total */}
                                            <div className="col-span-2 flex items-center justify-end gap-4">
                                                <span className="font-semibold text-[--color-text-primary]">
                                                    {formatPrice(item.price * item.quantity)}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        removeItem(item.productId, item.size)
                                                    }
                                                    className="p-2 hover:text-[--color-error] transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link href="/shop" className="inline-block mt-6">
                            <Button variant="outline">Continue Shopping</Button>
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="mt-8 lg:mt-0">
                        <div className="bg-[--color-primary-bg-secondary] border border-[--color-border] rounded-lg p-6 sticky top-20">
                            <h2 className="text-xl font-bold text-[--color-text-primary] mb-6">
                                ORDER SUMMARY
                            </h2>

                            {/* Discount Code */}
                            <form onSubmit={handleApplyDiscount} className="mb-6">
                                <label className="text-sm text-[--color-text-secondary] mb-2 block">
                                    DISCOUNT CODE
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="Enter code"
                                    />
                                    <Button type="submit" variant="outline">
                                        Apply
                                    </Button>
                                </div>
                            </form>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-[--color-text-secondary]">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-[--color-success]">
                                        <span>Discount ({discount * 100}%)</span>
                                        <span>-{formatPrice(discountAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-[--color-text-secondary]">
                                    <span>Delivery Fee</span>
                                    <span>
                                        {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                                    </span>
                                </div>
                                {subtotal < 100 && (
                                    <p className="text-xs text-[--color-accent-pink]">
                                        Add {formatPrice(100 - subtotal)} more for free delivery!
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-[--color-border] pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-[--color-text-primary]">
                                        Total
                                    </span>
                                    <span className="text-2xl font-bold text-[--color-accent-cyan]">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button variant="primary" size="lg" className="w-full">
                                    Checkout Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
