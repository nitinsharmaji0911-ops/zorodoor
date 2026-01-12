"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@prisma/client";

export default function MensPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products?gender=Men"); // Fetch men's products
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F2ED] dark:bg-zinc-900 text-[#2C2420] dark:text-white transition-colors duration-300">
            {/* HERO SECTION - Rough & Industrial */}
            <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="/hero/mens_bg.png"
                    alt="Mens Section"
                    fill
                    className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                    priority
                />

                <div className="relative z-10 text-center px-4">
                    <div className="inline-block px-4 py-1 border-2 border-white text-white font-bold tracking-[0.3em] uppercase mb-6 bg-black">
                        Est. 2025
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase mb-4 drop-shadow-xl">
                        ROUGH CUT
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-gray-300 tracking-wide max-w-2xl mx-auto">
                        Industrial durability meets street aesthetic.<br />
                        Built for the grind.
                    </p>
                </div>
            </section>

            {/* COLLECTION BANNER */}
            <div className="w-full bg-black text-white py-4 overflow-hidden">
                <div className="flex gap-8 animate-marquee whitespace-nowrap overflow-hidden">
                    {Array(10).fill("HEAVYWEIGHT COTTON // OVERSIZED FIT // STREET READY // ").map((text, i) => (
                        <span key={i} className="font-bold tracking-widest text-sm opacity-50">{text}</span>
                    ))}
                </div>
            </div>

            {/* PRODUCT GRID */}
            <section className="py-24 px-6 max-w-[1440px] mx-auto">
                <div className="flex items-center justify-between mb-12 border-b border-[#2C2420]/10 pb-6">
                    <h2 className="text-4xl font-black tracking-tighter uppercase ml-0 text-[#2C2420] dark:text-white">
                        ESSENTIALS <Zap className="inline-block fill-[#2C2420] dark:fill-white ml-2" />
                    </h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[4/5] bg-gray-200 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
}
