import { Suspense } from 'react'
import type { Metadata } from 'next'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Shop All T-Shirts | ZORODOOR Street Wear Clothing Store',
  description: 'Shop all ZORODOOR oversized graphic t-shirts — India\'s best street wear clothing store. Anime-inspired, 280gsm heavy cotton, bold prints. Free shipping above ₹999.',
  keywords: [
    'street wear clothing store',
    'buy streetwear online India',
    'oversized tshirts India',
    'anime graphic tshirts',
    'ZORODOOR shop all',
    'urban clothing India',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/products',
  },
  openGraph: {
    title: 'Shop All T-Shirts | ZORODOOR Street Wear Clothing Store',
    description: 'Browse India\'s boldest street wear clothing store. 280gsm heavyweight cotton oversized graphic T-shirts.',
    url: 'https://zorodoor.store/products',
  },
}

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-[#F5F5F5] border-b border-[#E0E0E0] py-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[#999] text-xs font-bold uppercase tracking-widest mb-2">Zorodoor</p>
          <h1 className="font-black text-[#111] uppercase tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            T-Shirts
          </h1>
          <p className="text-[#888] text-sm font-medium mt-2">&ldquo;The only thing we&apos;re allowed to do is believe that we won&apos;t regret the choice we made.&rdquo; Choose your armor.</p>
        </div>
      </div>

      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#111] border-t-transparent flex rounded-full animate-spin"/></div>}>
        <ProductsClient />
      </Suspense>
    </div>
  )
}
