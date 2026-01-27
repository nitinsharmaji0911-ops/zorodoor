"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, Zap, Crown } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// Featured Categories Data
const categories = [
  {
    id: "hoodies",
    name: "Hoodies",
    image: "/products/untitled_hoodie.png",
    link: "/shop?category=hoodies",
  },
  {
    id: "t-shirts",
    name: "T-Shirts",
    image: "/products/1767619612741-t-shirt_1.png",
    link: "/shop?category=t-shirts",
  },
  {
    id: "premium",
    name: "Premium",
    image: "/products/demon_slayer_hoodie_1767604977764.png",
    link: "/shop?category=premium",
  },
];

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F2ED] dark:bg-black transition-colors duration-300">

      {/* 1. HERO SECTION - Premium & Clean */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero/premium_hero.png"
            alt="Premium Streetwear"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          {/* Subtle Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-center justify-end h-full pb-24 md:pb-32">

          <div className="animate-fade-in-up">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-2 drop-shadow-2xl">
              ZORODOOR
            </h1>
            <p className="text-sm md:text-lg font-medium text-white/90 tracking-[0.5em] uppercase mb-12">
              Brutal Elegance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto animate-fade-in-up delay-200">
            <Link
              href="/mens"
              className="group relative h-16 bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors duration-300"
            >
              <span className="font-bold text-lg tracking-widest uppercase flex items-center gap-3">
                Shop Men <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/women"
              className="group relative h-16 bg-transparent border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              <span className="font-bold text-lg tracking-widest uppercase flex items-center gap-3">
                Shop Women <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PREVIEW - Minimalist Grid */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2 block">Collections</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
              LATEST DROPS
            </h2>
          </div>
          <Link href="/shop" className="hidden md:flex items-center gap-2 text-black dark:text-white font-medium hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors mt-4 md:mt-0">
            VIEW ALL <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-900"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <span className="text-white/80 text-xs font-bold tracking-widest uppercase inline-block border-b border-transparent group-hover:border-white transition-all">
                  View Collection
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/shop" className="flex items-center gap-2 text-black dark:text-white font-bold hover:underline underline-offset-4">
            VIEW ALL <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 3. BRAND STATEMENT - Clean Typography */}
      <section className="py-32 bg-[#F5F2ED] dark:bg-black text-black dark:text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <Crown size={32} className="mx-auto mb-8 text-black/20 dark:text-white/20" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
            "We don't just sell clothes.<br />We armor your ambition."
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Quality that commands respect. Designs that demand attention.
            Welcome to the new standard of Indian streetwear.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-3xl mx-auto border-t border-black/10 dark:border-white/10 pt-12">
            <div className="flex flex-col items-center gap-3">
              <Zap size={24} className="text-black/40 dark:text-white/40" />
              <span className="text-sm font-bold tracking-widest uppercase text-black dark:text-white">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Star size={24} className="text-black/40 dark:text-white/40" />
              <span className="text-sm font-bold tracking-widest uppercase text-black dark:text-white">Premium Cotton</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Crown size={24} className="text-black/40 dark:text-white/40" />
              <span className="text-sm font-bold tracking-widest uppercase text-black dark:text-white">Limited Edition</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
