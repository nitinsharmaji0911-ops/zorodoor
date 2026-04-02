import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import Logo from '@/components/Logo'
import { PRODUCTS } from '@/lib/products'
import { AnimateIn } from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'ZORODOOR | #1 Street Wear Clothing Store in India',
  description:
    'ZORODOOR — India\'s best street wear clothing store. Shop premium 280gsm oversized graphic T-shirts online. Anime & urban streetwear for those who dare to be different. Free shipping above ₹999.',
  keywords: [
    'street wear clothing store',
    'streetwear clothing store India',
    'buy streetwear online',
    'street wear store online India',
    'ZORODOOR',
    'oversized tshirt India',
    'anime streetwear India',
    'urban clothing store India',
    'graphic tshirts online',
    'premium streetwear India',
  ],
  alternates: {
    canonical: 'https://zorodoor.store',
  },
  openGraph: {
    title: 'ZORODOOR | #1 Street Wear Clothing Store in India',
    description:
      'Shop India\'s boldest street wear clothing store. Premium 280gsm heavyweight cotton, anime-inspired graphic T-shirts. Free shipping above ₹999.',
    url: 'https://zorodoor.store',
    type: 'website',
  },
}

const FEATURED = PRODUCTS.slice(0, 8)


export default function Home() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Native Typography Split Hero ───────────────────────────────── */}
      <section className="relative w-full bg-[#EFEFEF] overflow-hidden flex flex-col md:flex-row items-center" style={{ minHeight: '88vh' }}>
        
        {/* Right side / Background: High-Res Light Theme Image */}
        <div className="absolute inset-0 z-10">
          <div className="relative w-full h-full">
            <Image
              src="/new-hero.png"
              alt="Zorodoor Core Collection"
              fill
              className="object-cover object-top"
              priority
              quality={90}
            />
          </div>
        </div>

        {/* Button: Centered with slight right offset */}
        <div className="relative z-20 w-full h-full max-w-[1400px] mx-auto flex items-center justify-center md:justify-center pt-24 md:pt-0" style={{ minHeight: '88vh' }}>
          <AnimateIn delay={0.2}>
            <div className="md:translate-x-[50px] lg:translate-x-[100px]">
              <Link href="/products"
                className="inline-flex items-center justify-center gap-3 bg-[#111] text-white font-black text-sm px-10 py-5 rounded-full uppercase tracking-widest hover:bg-[#FF3B30] hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_40px_rgba(255,59,48,0.3)]">
                Shop The Drop
                <span className="text-xl leading-none font-normal">→</span>
              </Link>
            </div>
          </AnimateIn>
          
          {/* Subtle noise overlay */}
          <div className="fixed inset-0 opacity-[0.02] z-0 pointer-events-none mix-blend-multiply"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>
      </section>

      {/* ── Marquee ────────────────────────────── */}
      <div className="bg-[#0a0a0a] border-y-2 border-[#1a1a1a] py-8 overflow-hidden flex flex-col gap-4">
        {/* Row 1: Left */}
        <div className="animate-marquee inline-flex whitespace-nowrap">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="font-black text-white uppercase tracking-tight mr-10"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
              IF ITS BORING ITS NOT MINE &nbsp;★&nbsp; WAKE UP TO REALITY &nbsp;★&nbsp; SAY FUCK YOU TO SOCIETY ONCE IN A WHILE &nbsp;★&nbsp; I'M IN THE BUSINESS OF WINNING &nbsp;★&nbsp;
            </span>
          ))}
        </div>
        {/* Row 2: Right (Reverse) */}
        <div className="animate-marquee-reverse inline-flex whitespace-nowrap opacity-50">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="font-black text-white uppercase tracking-tight mr-10"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
              ZORODOOR &nbsp;•&nbsp; 280GSM HEAVYWEIGHT COTTON &nbsp;•&nbsp; STREETWEAR ENGINEERED &nbsp;•&nbsp; NO FAST FASHION &nbsp;•&nbsp; LIMITED RUNS &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Products Section ───────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-[1400px] mx-auto overflow-hidden">
        <AnimateIn delay={0.1}>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#999] text-xs font-bold uppercase tracking-widest mb-2">Exclusive Product Lines</p>
              <h2 className="font-black text-[#111] tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                Core Collection
              </h2>
            </div>
            <Link href="/products"
              className="text-xs font-black uppercase tracking-widest border-b-2 border-[#111] pb-0.5 hover:text-[#FF3B30] hover:border-[#FF3B30] transition-colors">
              View All →
            </Link>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {FEATURED.map((product, i) => (
            <AnimateIn key={product.id} delay={0.15 + (i * 0.1)} y={40}>
              <ProductCard product={product} priority={i < 2} />
            </AnimateIn>
          ))}
        </div>
      </section>

    </div>
  )
}
