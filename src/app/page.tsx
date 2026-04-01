import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import Logo from '@/components/Logo'
import { PRODUCTS } from '@/lib/products'

const FEATURED = PRODUCTS.slice(0, 8)


export default function Home() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Native Typography Split Hero ───────────────────────────────── */}
      <section className="relative w-full bg-black overflow-hidden flex flex-col md:flex-row items-center" style={{ minHeight: '88vh' }}>
        
        {/* Right side: High-Res Single Model Shot securely contained */}
        <div className="absolute inset-0 md:left-[30%] z-10 flex justify-end">
          <div className="relative w-full h-full opacity-40 md:opacity-80">
            {/* Gradient mask for seamless fade-in from pure black */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/80 md:via-transparent to-transparent z-20" />
            <Image
              src="/hero_perfect.png"
              alt="Zorodoor Core Collection"
              fill
              className="object-cover md:object-contain object-top md:object-right mix-blend-lighten"
              priority
              quality={85}
            />
          </div>
        </div>

        {/* Left side: Pure Native HTML Typography (flawless resolution) */}
        <div className="relative z-20 w-full md:w-2/3 px-6 md:px-[8%] pt-16 md:pt-0 max-w-[1400px] mx-auto flex flex-col justify-center" style={{ minHeight: '88vh' }}>
          <p className="text-[#FF3B30] font-black text-xs md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-6">
            If Its Boring Its Not Mine
          </p>
          <h1 className="mb-8 md:mb-10 drop-shadow-2xl">
            <Logo inverted width={620} style={{ width: 'clamp(220px, 55vw, 620px)', height: 'auto' }} />
          </h1>
          <p className="text-[#aaa] text-sm md:text-lg font-medium max-w-[400px] mb-8 md:mb-12 leading-relaxed drop-shadow-md">
            "Wake up to reality! Nothing ever goes as planned in this accursed world." Heavyweight 280gsm cotton. Authentic streetwear engineered for the streets.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products"
              className="inline-flex items-center justify-center gap-3 bg-white text-black font-black text-sm px-8 py-4 md:px-10 md:py-5 rounded-full uppercase tracking-widest hover:bg-[#FF3B30] hover:text-white hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,59,48,0.3)]">
              Shop The Drop
              <span className="text-xl leading-none font-normal">→</span>
            </Link>
          </div>
          
          {/* Subtle noise over text area to bind it to dark aesthetic */}
          <div className="fixed inset-0 opacity-[0.03] z-0 pointer-events-none mix-blend-screen"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>
      </section>

      {/* ── Marquee ────────────────────────────── */}
      <div className="bg-[#0a0a0a] border-y-2 border-[#1a1a1a] py-5 overflow-hidden">
        <div className="animate-marquee inline-flex whitespace-nowrap">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="font-black text-white uppercase tracking-tight mr-10"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
              IF ITS BORING ITS NOT MINE &nbsp;★&nbsp; WAKE UP TO REALITY &nbsp;★&nbsp; SAY FUCK YOU TO SOCIETY ONCE IN A WHILE &nbsp;★&nbsp; I'M IN THE BUSINESS OF WINNING &nbsp;★&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Products Section ───────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-[1400px] mx-auto">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {FEATURED.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 2} />
          ))}
        </div>
      </section>

    </div>
  )
}
