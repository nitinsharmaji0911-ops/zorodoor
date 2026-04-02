import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Best Sellers | ZORODOOR Street Wear Clothing Store',
  description: 'Shop ZORODOOR\'s best-selling oversized graphic T-shirts. India\'s top street wear clothing store — fan favourites that keep selling out. Free shipping above ₹999.',
  keywords: [
    'best selling streetwear India',
    'ZORODOOR best sellers',
    'street wear clothing store top picks',
    'popular oversized tshirts India',
    'bestseller anime tshirt India',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/best-sellers',
  },
}

const bestSellers = [
  { id: '3', name: 'Zero Fucks Oversized Tee', price: 1999, originalPrice: 2499, image: '/products/zero_fucks_tshirt.png', badge: '🔥 Best Seller', sales: 48 },
  { id: '7', name: 'Goku Dragon Oversized Tee', price: 2199, originalPrice: 2999, image: '/products/goku_tshirt_front.png', badge: '⚡ Limited', sales: 32, soldOut: true },
]

export default function BestSellersPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
      <div className="mb-12">
        <p className="text-[#999] text-xs font-black uppercase tracking-widest mb-3">Fan Favourites</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#111]">Best Sellers</h1>
        <p className="text-[#555] font-medium mt-4 text-lg">The pieces everyone keeps talking about.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bestSellers.map(product => (
          <Link key={product.id} href={`/products/${product.id}`} className="group">
            <div className={`aspect-[4/5] bg-[#F5F5F5] rounded-2xl overflow-hidden relative mb-4 ${product.soldOut ? 'opacity-70' : ''}`}>
              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                <span className="bg-[#0a0a0a] text-white text-[10px] font-black px-2.5 py-1 rounded-full">{product.badge}</span>
                {product.soldOut && <span className="bg-[#888] text-white text-[10px] font-black px-2.5 py-1 rounded-full">Sold Out</span>}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                <p className="text-[10px] font-black text-[#555] uppercase tracking-widest">{product.sales}+ sold</p>
              </div>
            </div>
            <h3 className="font-bold text-sm text-[#111] mb-2">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="font-black text-[#111]">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-sm text-[#BBB] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
