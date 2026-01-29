
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CollectionSection } from "@/components/CollectionSection";
import { BrandStatement } from "@/components/BrandStatement";

// Revalidate data every 60 seconds (or 0 for real-time)
export const revalidate = 0;

export default async function Home() {
  // Fetch latest 3 products
  const latestDrops = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-[--color-primary-bg-secondary] transition-colors duration-300">

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
              href="/shop?gender=Men"
              className="group relative h-16 bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors duration-300"
            >
              <span className="font-bold text-lg tracking-widest uppercase flex items-center gap-3">
                Shop Men <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/shop?gender=Women"
              className="group relative h-16 bg-transparent border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              <span className="font-bold text-lg tracking-widest uppercase flex items-center gap-3">
                Shop Women <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PREVIEW / LATEST DROPS - Minimalist Grid */}
      <CollectionSection products={latestDrops} />

      {/* 3. BRAND STATEMENT - Clean Typography */}
      <BrandStatement />

    </main>
  );
}
