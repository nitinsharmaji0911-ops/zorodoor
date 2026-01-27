"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@prisma/client";

export default function WomenPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products?gender=Women"); // Fetch women's products
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
        <div className="min-h-screen bg-[#F5F2ED] dark:bg-black text-black dark:text-white transition-colors duration-300">
            {/* HERO SECTION - Funky & Graphic */}
            <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="/hero/madamji_bg.png"
                    alt="Women's Collection"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                <div className="relative z-10 text-center px-4">
                    <div className="inline-block px-6 py-2 border-2 border-cyan-400 rounded-full mb-6 rotate-[-2deg] bg-black/50 backdrop-blur-md">
                        <span className="text-cyan-400 font-black tracking-widest uppercase">The Revolution is Female</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] mb-4">
                        WOMEN
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-white/90 tracking-wide max-w-2xl mx-auto">
                        Funky. Fearless. Fatal. <br />
                        Streetwear for the queen who rules the concrete jungle.
                    </p>
                </div>
            </section>

            {/* "HIS HOODIE" SECTION - The Hook */}
            <section className="py-24 relative overflow-hidden bg-white dark:bg-[#111] transition-colors duration-300">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                        {/* Image Side */}
                        <div className="w-full md:w-1/2 relative group">
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/20 transform rotate-[-2deg] transition-transform duration-500 group-hover:rotate-0">
                                <Image
                                    src="/hero/his_hoodie.png"
                                    alt="Wearing His Hoodie"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-bold text-lg">#BoyfriendFit</p>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500 rounded-full blur-[80px] opacity-50" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500 rounded-full blur-[80px] opacity-50" />
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 space-y-8">
                            <div className="flex items-center gap-3 text-pink-500">
                                <Heart className="fill-pink-500 animate-pulse" />
                                <span className="font-black tracking-widest uppercase">The "His Hoodie" Collection</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-black leading-tight text-black dark:text-white">
                                GIFT IT TO HIM.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                                    STEAL IT BACK.
                                </span>
                            </h2>

                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                We know the drill. You buy it "for him," but let's be real—it looks better on you.
                                Oversized, ultra-comfortable, and designed to be stolen.
                            </p>

                            <div className="pt-4">
                                <Link href="/shop?collection=HisHoodie">
                                    <Button size="xl" className="bg-white text-black hover:bg-cyan-400 hover:text-black border-none font-black tracking-wider shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                                        SHOP THE STEAL <ArrowRight className="ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* PRODUCT GRID */}
            <section className="py-24 px-6 max-w-[1440px] mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-black italic tracking-tighter">
                        LATEST DROPS <Sparkles className="inline-block text-cyan-400 ml-2" />
                    </h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[4/5] bg-gray-200 dark:bg-gray-900 rounded-2xl animate-pulse" />
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
