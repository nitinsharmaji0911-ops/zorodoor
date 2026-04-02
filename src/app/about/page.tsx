import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Zorodoor & Founder Nitin Sharma | ZORODOOR Street Wear Clothing Store',
  description:
    'ZORODOOR was founded by Nitin Sharma — an Indian entrepreneur and streetwear designer building India\'s boldest anime-inspired street wear clothing store. Learn the story behind the brand.',
  keywords: [
    'Nitin Sharma',
    'Nitin Sharma founder',
    'Nitin Sharma ZORODOOR',
    'Nitin Sharma Indian entrepreneur',
    'ZORODOOR about',
    'Indian streetwear founder',
    'anime streetwear India founder',
    'street wear clothing store India founder',
  ],
  openGraph: {
    title: 'About ZORODOOR & Founder Nitin Sharma | Street Wear Clothing Store',
    description: 'The story of ZORODOOR — founded by Nitin Sharma to give Indian streetwear a brutal, authentic anime identity.',
    type: 'profile',
  },
  alternates: {
    canonical: 'https://zorodoor.store/about',
  },
}

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About ZORODOOR",
  url: "https://zorodoor.store/about",
  description: "ZORODOOR was founded by Nitin Sharma, an Indian entrepreneur and streetwear designer.",
  mainEntity: {
    "@type": "Person",
    name: "Nitin Sharma",
    jobTitle: "Founder & Creative Director, ZORODOOR",
    description: "Nitin Sharma is the founder of ZORODOOR, India's boldest anime streetwear brand. He built ZORODOOR to fuse Indian streetwear culture with anime aesthetics on premium heavyweight cotton.",
    nationality: "Indian",
    brand: {
      "@type": "Brand",
      name: "ZORODOOR",
      url: "https://zorodoor.store",
    },
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />

      {/* Hero Banner */}
      <div className="bg-[#0a0a0a] py-20 px-6 text-center border-b border-[#1a1a1a]">
        <p className="text-[#FF3B30] text-xs font-black uppercase tracking-[0.4em] mb-4">The Origin Story</p>
        <h1 className="font-black text-white uppercase tracking-tighter leading-[1] mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
          ZORO<span className="text-[#FF3B30]">DOOR</span>
        </h1>
        <p className="text-[#888] font-medium max-w-xl mx-auto text-sm md:text-base">
          If Its Boring, Its Not Mine.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Brand Story */}
        <section className="mb-20">
          <p className="text-[#999] text-xs font-black uppercase tracking-widest mb-4">The Brand</p>
          <h2 className="font-black text-[#111] text-3xl md:text-4xl uppercase tracking-tight mb-8">
            Born to Be Different
          </h2>
          <div className="space-y-6 text-[#555] font-medium leading-relaxed text-sm md:text-base">
            <p className="text-xl text-[#111] font-bold">
              Brutal self-expression through streetwear. Where anime meets fashion.
            </p>
            <p>
              Founded on the streets of India, <strong className="text-[#111]">ZORODOOR</strong> is more than just a clothing brand. We are a movement dedicated to those who refuse to blend in. Our designs are strictly limited-run, extremely oversized, and unapologetically bold.
            </p>
            <p>
              We print exclusively on heavyweight <strong className="text-[#111]">280gsm 100% premium cotton</strong>, ensuring that every piece maintains its strict, boxy silhouette. Our aesthetic draws heavy inspiration from gothic art, brutalist architecture, and underground anime culture.
            </p>
            <p>
              No basic designs. No fast fashion materials. We build garments that make a statement the moment you enter a room.
            </p>
          </div>
        </section>

        <div className="border-t border-[#EAEAEA] mb-20" />

        {/* Founder Section — Nitin Sharma */}
        <section className="mb-20">
          <p className="text-[#999] text-xs font-black uppercase tracking-widest mb-4">The Founder</p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-black text-[#111] text-3xl md:text-4xl uppercase tracking-tight mb-4">
                Nitin Sharma
              </h2>
              <p className="text-[#FF3B30] text-xs font-black uppercase tracking-widest mb-6">
                Founder & Creative Director
              </p>
              <div className="space-y-5 text-[#555] font-medium leading-relaxed text-sm md:text-base">
                <p>
                  <strong className="text-[#111]">Nitin Sharma</strong> is the founder and creative director of ZORODOOR. Born and raised in India, Nitin built ZORODOOR to give the next generation of Indian streetwear an identity that's genuinely raw and culturally authentic.
                </p>
                <p>
                  Frustrated by the lack of bold, heavyweight streetwear in the Indian market, Nitin set out to create something different. Something that would hit differently — both in quality and in soul. ZORODOOR was born from that obsession.
                </p>
                <p>
                  Every drop is personally designed and curated by Nitin to ensure it carries the brand's non-negotiable standard: graphic-forward design, premium cotton, and a silhouette built to turn heads.
                </p>
                <p className="text-[#111] font-bold italic border-l-4 border-[#FF3B30] pl-4">
                  "If Its Boring Its Not Mine." — Nitin Sharma
                </p>
              </div>
            </div>
            <div className="bg-[#0a0a0a] rounded-3xl p-8 text-white">
              <h3 className="font-black text-sm uppercase tracking-widest text-[#888] mb-6">Quick Facts</h3>
              <ul className="space-y-5">
                {[
                  { label: 'Name', value: 'Nitin Sharma' },
                  { label: 'Role', value: 'Founder & Creative Director' },
                  { label: 'Brand', value: 'ZORODOOR' },
                  { label: 'Based In', value: 'India' },
                  { label: 'Founded', value: '2025' },
                  { label: 'Mission', value: 'Make Indian streetwear brutal again' },
                ].map((fact) => (
                  <li key={fact.label} className="flex justify-between items-start gap-4 border-b border-[#1a1a1a] pb-4 last:border-0 last:pb-0">
                    <span className="text-[#888] text-xs uppercase tracking-wider font-bold flex-shrink-0">{fact.label}</span>
                    <span className="text-white font-bold text-sm text-right">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="border-t border-[#EAEAEA] mb-20" />

        {/* Values */}
        <section className="mb-20">
          <p className="text-[#999] text-xs font-black uppercase tracking-widest mb-4">What We Stand For</p>
          <h2 className="font-black text-[#111] text-3xl md:text-4xl uppercase tracking-tight mb-10">
            The Zorodoor Code
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Heavyweight Only',
                desc: '280gsm ring-spun cotton. No light, papery nonsense. Every piece has weight, structure, and longevity.',
                icon: '⚖️',
              },
              {
                title: 'Limited Drops',
                desc: 'We never chase volume. Each collection is deliberately scarce. If you sleep on it, you miss it.',
                icon: '🔒',
              },
              {
                title: 'Brutally Authentic',
                desc: 'No trends. No compromise. We design what speaks truth to anime culture and the streets.',
                icon: '🔥',
              },
            ].map((v) => (
              <div key={v.title} className="bg-[#F5F5F5] rounded-2xl p-6">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-black text-sm uppercase tracking-widest text-[#111] mb-3">{v.title}</h3>
                <p className="text-[#666] leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#0a0a0a] rounded-3xl p-10 text-center">
          <h2 className="font-black text-white text-2xl uppercase tracking-tight mb-3">Ready to Wake Up?</h2>
          <p className="text-[#888] mb-8 font-medium">Shop the collection. No basic allowed.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-[#FF3B30] text-white font-black text-xs uppercase tracking-widest px-10 py-4 rounded-full hover:bg-white hover:text-[#111] transition-all duration-300"
          >
            Shop the Drop →
          </Link>
        </div>
      </div>
    </>
  )
}
