import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'New Arrivals | ZORODOOR Street Wear Clothing Store',
  description: 'Fresh drops just landed at ZORODOOR — India\'s top street wear clothing store. Shop the latest limited-run oversized anime graphic tees before they sell out.',
  keywords: [
    'new streetwear India',
    'ZORODOOR new arrivals',
    'street wear clothing store new drops',
    'latest anime tshirts India',
    'new oversized tshirt drop',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/new-arrivals',
  },
}

const newArrivals = [
  { id: '4', name: 'Just Chilling Palm Tee', price: 1999, originalPrice: 2499, image: '/products/just_chilling_tshirt.png', badge: '🌴 New Arrival' },
  { id: '8', name: 'Berserk Oversized Tee', price: 2199, originalPrice: 2799, image: '/products/berserk_tshirt_front.png', badge: '🗡️ Anime Drop' },
]

export default function NewArrivalsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
      <div className="mb-12">
        <p className="text-[#999] text-xs font-black uppercase tracking-widest mb-3">Just Dropped</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#111]">New Arrivals</h1>
        <p className="text-[#555] font-medium mt-4 text-lg">Fresh raw streetwear just hit the rack. Limited pieces per drop. </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {newArrivals.map(product => {
          const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          return (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="aspect-[4/5] bg-[#F5F5F5] rounded-2xl overflow-hidden relative mb-4">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  <span className="bg-[#0a0a0a] text-white text-[10px] font-black px-2.5 py-1 rounded-full">{product.badge}</span>
                  <span className="bg-[#FF3B30] text-white text-[10px] font-black px-2.5 py-1 rounded-full">-{discount}%</span>
                </div>
              </div>
              <h3 className="font-bold text-sm text-[#111] mb-2">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#111]">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-sm text-[#BBB] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-16 text-center">
        <Link href="/products" className="inline-block border border-[#111] text-[#111] font-black uppercase tracking-widest text-xs px-10 py-4 rounded-xl hover:bg-[#111] hover:text-white transition-colors">
          View All T-Shirts
        </Link>
      </div>
    </div>
  )
}
