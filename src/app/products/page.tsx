import { Suspense } from 'react'
import type { Metadata } from 'next'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'T-Shirts | ZORODOOR',
  description: 'Shop all Zorodoor oversized graphic t-shirts — anime-inspired, heavy cotton, bold prints. Made in India.',
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
