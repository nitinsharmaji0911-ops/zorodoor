"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Heart, Truck, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import RatingStars from "@/components/ui/RatingStars";
import ProductCard from "@/components/products/ProductCard";
import { useCart } from "@/lib/contexts/CartContext";
import { useWishlist } from "@/lib/contexts/WishlistContext";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";

interface ProductDetailsClientProps {
    product: any; // Type this properly later
    relatedProducts: any[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
    const { addItem } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();
    const { showToast } = useToast();

    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const handleAddToCart = () => {
        if (!selectedSize) {
            showToast("Please select a size", "error");
            return;
        }

        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            size: selectedSize,
            image: product.images[0],
        });
        showToast("Added to cart!", "success");
    };

    const handleWishlist = () => {
        if (isInWishlist(product.id)) {
            showToast("Already in wishlist", "info");
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
            });
            showToast("Added to wishlist!", "success");
        }
    };

    return (
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Images */}
            <div>
                <div className="aspect-square bg-[--color-primary-bg-secondary] border border-[--color-border] rounded-lg overflow-hidden mb-4">
                    <Image
                        src={product.images[selectedImage]}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {product.images.map((img: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`aspect-square border rounded-lg overflow-hidden transition-all ${selectedImage === idx
                                ? "border-[--color-accent-cyan]"
                                : "border-[--color-border] hover:border-[--color-accent-cyan]"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${product.name} view ${idx + 1}`}
                                width={150}
                                height={150}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div>
                <h1 className="text-4xl font-bold text-[--color-text-primary] mb-4">
                    {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                    <RatingStars rating={product.rating} showValue />
                    <span className="text-[--color-text-secondary]">
                        ({product.reviewCount} reviews)
                    </span>
                </div>

                <p className="text-4xl font-bold text-[#8B7355] mb-6">
                    {formatPrice(product.price)}
                </p>

                <p className="text-[--color-text-secondary] mb-6">
                    {product.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[--color-text-primary] mb-2">
                        FEATURES:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-[--color-text-secondary]">
                        {product.features.map((feature: string, idx: number) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[--color-text-primary] mb-3">
                        SELECT SIZE:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {product.sizes.map((size: string) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-6 py-3 border rounded-lg font-medium transition-all duration-200 ${selectedSize === size
                                    ? "bg-[#8B7355] text-white border-[#8B7355] shadow-md scale-105"
                                    : "bg-[--color-primary-bg-secondary] text-[--color-text-primary] border-[--color-border] hover:border-[#8B7355] hover:text-[#8B7355]"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[--color-text-primary] mb-3">
                        QUANTITY:
                    </h3>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-4 py-2 bg-[--color-primary-bg-secondary] border border-[--color-border] rounded-lg hover:border-[--color-accent-cyan] transition-colors"
                        >
                            -
                        </button>
                        <span className="text-xl font-semibold text-[--color-text-primary] w-12 text-center">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                            className="px-4 py-2 bg-[--color-primary-bg-secondary] border border-[--color-border] rounded-lg hover:border-[--color-accent-cyan] transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Add to Cart & Wishlist */}
                <div className="flex gap-4 mb-6">
                    <Button
                        onClick={handleAddToCart}
                        variant="primary"
                        size="lg"
                        className="flex-1"
                    >
                        Add to Cart
                    </Button>
                    <Button
                        onClick={handleWishlist}
                        variant="outline"
                        size="lg"
                        className="px-6"
                    >
                        <Heart
                            size={20}
                            fill={isInWishlist(product.id) ? "currentColor" : "none"}
                        />
                    </Button>
                </div>

                {/* Shipping Info */}
                <div className="space-y-3 bg-[--color-primary-bg-secondary] border border-[--color-border] rounded-lg p-4">
                    <div className="flex items-center gap-3 text-[--color-text-secondary]">
                        <Truck size={20} className="text-[--color-accent-cyan]" />
                        <span className="text-sm">Free shipping on orders over $100</span>
                    </div>
                    <div className="flex items-center gap-3 text-[--color-text-secondary]">
                        <Shield size={20} className="text-[--color-accent-cyan]" />
                        <span className="text-sm">30-day return policy</span>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-20 lg:col-span-2">
                    <h2 className="text-3xl font-bold text-[--color-text-primary] mb-8">
                        YOU MAY ALSO LIKE
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
