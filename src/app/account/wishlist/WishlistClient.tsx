'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { useWishlistStore } from '@/store/wishlistStore'

export default function WishlistClient() {
  const [mounted, setMounted] = useState(false)
  const items = useWishlistStore(state => state.items)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="animate-pulse h-64 bg-gray-100 rounded-2xl w-full"></div>
  }

  return (
    <div>
      {items.length === 0 ? (
        <div className="bg-white border border-[#EAEAEA] rounded-2xl p-16 text-center">
          <p className="text-5xl mb-4">🖤</p>
          <p className="font-black text-lg uppercase tracking-tight mb-2">Your wishlist is empty</p>
          <p className="text-[#888] text-sm font-medium mb-6">Tap the heart on any product to save it here.</p>
          <Link href="/products"
            className="inline-block bg-[#111] text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-[#FF3B30] transition-colors">
            Browse Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
