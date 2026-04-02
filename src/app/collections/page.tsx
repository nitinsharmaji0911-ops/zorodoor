import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Collections | ZORODOOR Street Wear Clothing Store',
  description: 'Explore all ZORODOOR streetwear drop collections — Anime, Brutalist & Limited Editions. India\'s top street wear clothing store with premium 280gsm oversized tees.',
  keywords: [
    'street wear clothing store collections',
    'ZORODOOR collections',
    'anime streetwear collections India',
    'streetwear drops India',
    'limited edition tshirts India',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/collections',
  },
}

const collections = [
  {
    name: 'Anime Drops',
    description: 'For the underground otaku who wears their obsession.',
    image: '/products/goku_tshirt_front.png',
    href: '/products?filter=anime',
    count: '2 Drops',
    badge: '🗡️ Limited',
  },
  {
    name: 'Street Statements',
    description: 'Bold text. Zero excuses. Wear what you mean.',
    image: '/products/zero_fucks_tshirt.png',
    href: '/products?filter=statement',
    count: '1 Drop',
    badge: '🔥 Best Seller',
  },
  {
    name: 'Chill Vibes',
    description: 'Oversized. Relaxed. Made for those who move slow on purpose.',
    image: '/products/just_chilling_tshirt.png',
    href: '/products?filter=chill',
    count: '1 Drop',
    badge: '🌴 New',
  },
]

export default function CollectionsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
      <div className="mb-12">
        <p className="text-[#999] text-xs font-black uppercase tracking-widest mb-3">Shop By Theme</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#111]">Collections</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map(col => (
          <Link key={col.name} href={col.href} className="group">
            <div className="aspect-[3/4] relative bg-[#F5F5F5] rounded-3xl overflow-hidden mb-5">
              <Image src={col.image} alt={col.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-black text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">{col.badge}</span>
                <h2 className="text-2xl font-black text-white mt-3 tracking-tight">{col.name}</h2>
                <p className="text-white/70 text-sm font-medium mt-1">{col.count}</p>
              </div>
            </div>
            <p className="font-medium text-sm text-[#555] leading-relaxed">{col.description}</p>
            <span className="inline-block mt-3 text-xs font-black uppercase tracking-widest text-[#111] group-hover:text-[#FF3B30] transition-colors">
              Shop Collection →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
