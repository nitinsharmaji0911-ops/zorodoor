"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Plus } from "lucide-react";
import RatingStars from "@/components/ui/RatingStars";
import Button from "@/components/ui/Button";
import { useCart } from "@/lib/contexts/CartContext";
import { useWishlist } from "@/lib/contexts/WishlistContext";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    rating: number;
    reviewCount: number;
    sizes: string[];
    inStock: boolean;
}

export default function ProductCard({
    id,
    name,
    slug,
    price,
    images,
    rating,
    reviewCount,
    sizes,
    inStock,
}: ProductCardProps) {
    const { addItem } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { showToast } = useToast();
    const isWishlisted = isInWishlist(id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!inStock) return;

        addItem({
            productId: id,
            name,
            price,
            quantity: 1,
            size: sizes[0],
            image: images[0],
        });
        showToast(`${name} added to cart!`, "success");
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isWishlisted) {
            removeFromWishlist(id);
            showToast("Removed from wishlist", "info");
        } else {
            addToWishlist({ id, name, price, image: images[0] });
            showToast("Added to wishlist!", "success");
        }
    };

    return (
        <div className="group relative flex flex-col w-full">
            <Link href={`/product/${slug}`} className="block relative w-full rounded-2xl bg-[#EBE7E0] overflow-hidden group-hover:shadow-lg transition-all duration-300">
                {/* Image Layer - Fixed Aspect Ratio */}
                <div className="relative aspect-[4/5] w-full bg-[#EBE7E0]">
                    <Image
                        src={images[0]}
                        alt={name}
                        fill
                        className={cn(
                            "object-cover object-center transition-opacity duration-500",
                            images[1] ? "group-hover:opacity-0" : ""
                        )}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority
                    />
                    {images[1] && (
                        <Image
                            src={images[1]}
                            alt={name}
                            fill
                            className="object-cover object-center absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    )}
                </div>

                {/* Badges/Overlays */}
                {!inStock && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                        Sold Out
                    </div>
                )}

                {/* Quick Actions Overlay (Desktop) */}
                <div className="hidden lg:flex absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex-col gap-2">
                    <button
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className="w-full bg-white/95 backdrop-blur-sm text-[#2C2420] font-bold py-3.5 rounded-xl hover:bg-[#2C2420] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Plus size={18} />
                        {inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                </div>

                {/* Wishlist Button - Always Visible but refined */}
                <button
                    onClick={handleWishlistToggle}
                    className={cn(
                        "absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-10",
                        isWishlisted
                            ? "bg-[#8B7355] text-white shadow-md"
                            : "bg-white/80 backdrop-blur-sm text-[#2C2420] opacity-0 group-hover:opacity-100 hover:bg-[#8B7355] hover:text-white"
                    )}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2} />
                </button>
            </Link>

            {/* Product Details - Minimal & Clean */}
            <div className="mt-4 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <Link href={`/product/${slug}`} className="group-hover:text-[#8B7355] transition-colors duration-200">
                        <h3 className="text-base font-bold text-[#2C2420] leading-tight line-clamp-1">{name}</h3>
                    </Link>
                    <span className="text-sm font-bold text-[#2C2420]">{formatPrice(price)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B5E52] capitalize">{sizes[0]} - {sizes[sizes.length - 1]}</span>
                    <span className="w-1 h-1 rounded-full bg-[#E8E2D8]"></span>
                    <RatingStars rating={rating} reviewCount={reviewCount} size={12} showCount={false} />
                </div>

                {/* Mobile Add Button (Always visible on mobile) */}
                <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="lg:hidden mt-2 w-full py-2.5 bg-[#2C2420] text-white text-sm font-bold rounded-lg"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
