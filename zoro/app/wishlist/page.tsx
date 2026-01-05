"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist, WishlistItem } from "@/lib/contexts/WishlistContext";
import { useCart } from "@/lib/contexts/CartContext";
import Button from "@/components/ui/Button";
import { Trash2, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addItem } = useCart();

    const handleMoveToCart = (item: WishlistItem) => {
        addItem({
            productId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
            size: "M", // Default size, user might need to select later
        });
        removeFromWishlist(item.id);
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <h1 className="text-3xl font-bold mb-4 text-[--color-text-primary]">
                    Your Wishlist is Empty
                </h1>
                <p className="text-[--color-text-secondary] mb-8 text-center max-w-md">
                    Looks like you haven't found your style yet. Explore our collection and find pieces that speak to you.
                </p>
                <Link href="/shop">
                    <Button variant="primary">Browse Collection</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-[--color-text-primary]">
                My Wishlist ({wishlist.length})
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlist.map((item) => (
                    <div
                        key={item.id}
                        className="group relative bg-[--color-bg-secondary] rounded-lg overflow-hidden border border-[--color-border] hover:border-[--color-accent-cyan] transition-colors"
                    >
                        <div className="aspect-square relative overflow-hidden bg-gray-200">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="p-4">
                            <Link href={`/product/${item.id}`}>
                                <h3 className="text-lg font-semibold text-[--color-text-primary] mb-1 hover:text-[--color-accent-cyan] transition-colors line-clamp-1">
                                    {item.name}
                                </h3>
                            </Link>
                            <p className="text-[--color-text-secondary] font-medium mb-4">
                                ${item.price.toFixed(2)}
                            </p>

                            <div className="flex gap-3">
                                <Button
                                    variant="primary"
                                    className="flex-1 flex items-center justify-center gap-2"
                                    onClick={() => handleMoveToCart(item)}
                                >
                                    <ShoppingBag size={18} />
                                    Move to Cart
                                </Button>
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="p-2 text-[--color-text-secondary] hover:text-red-500 transition-colors border border-[--color-border] rounded-md hover:border-red-500"
                                    aria-label="Remove from wishlist"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
