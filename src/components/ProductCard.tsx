'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { ShoppingBag, Heart, Star } from 'lucide-react'
import { type Product } from '@/lib/products'

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const addItem = useCartStore(state => state.addItem)
  const toggleWishlist = useWishlistStore(state => state.toggleItem)
  const isWishlistedStore = useWishlistStore(state => state.isInWishlist(product.id))
  
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || product.sizes?.[0] || 'M')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sizes = product.sizes || ['S', 'M', 'L', 'XL']
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const isWishlisted = mounted ? isWishlistedStore : false

  return (
    <div className={`group relative bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden flex flex-col ${product.inStock === false ? 'opacity-70' : ''} hover:border-[#111] transition-colors`}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.badge && (
          <span className="bg-[#0a0a0a] text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wider">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="bg-[#FF3B30] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {product.inStock === false && (
          <span className="bg-[#888] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
            Sold Out
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => { 
          e.preventDefault()
          e.stopPropagation()
          toggleWishlist(product)
        }}
        className="absolute top-3 right-3 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
        <Heart size={15} strokeWidth={2} fill={isWishlisted ? '#FF3B30' : 'none'} className={isWishlisted ? 'text-[#FF3B30]' : 'text-[#999]'} />
      </button>

      {/* Product Image Link */}
      <Link href={`/products/${product.id}`} className="aspect-[4/5] bg-[#F5F5F5] overflow-hidden relative block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover product-img"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          quality={80}
        />

        {/* Hover Quick-Add panel */}
        <div 
          onClick={(e) => {
            // Prevent clicking inside this panel from firing the parent Link navigation
            e.preventDefault()
            e.stopPropagation()
          }}
          className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-[#E8E8E8] z-20"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-2 pointer-events-none">Select Size</p>
          <div className="flex gap-1.5 flex-wrap mb-3">
            {sizes.map(size => (
              <button
                key={size}
                onClick={(e) => { 
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedSize(size) 
                }}
                className={`text-[11px] font-bold px-2.5 py-1 border rounded-lg transition-colors ${
                  selectedSize === size
                    ? 'bg-[#111] text-white border-[#111]'
                    : 'border-[#DDD] text-[#555] hover:border-[#111]'
                }`}>
                {size}
              </button>
            ))}
          </div>
          <button
            disabled={product.inStock === false}
            onClick={(e) => { 
              e.preventDefault()
              e.stopPropagation()
              if (product.inStock !== false) {
                addItem({ ...product, size: selectedSize }) 
              }
            }}
            className="w-full bg-[#111] text-white text-[11px] font-black uppercase tracking-widest py-2.5 rounded-xl hover:bg-[#FF3B30] transition-colors flex items-center justify-center gap-2 disabled:bg-[#999] disabled:cursor-not-allowed">
            <ShoppingBag size={13} />
            {product.inStock === false ? 'Sold Out' : 'Add To Cart'}
          </button>
        </div>
      </Link>

      {/* Info Link */}
      <Link href={`/products/${product.id}`} className="p-4 flex flex-col flex-1 block">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#999] mb-1">{product.category}</p>
        <h3 className="font-bold text-[13px] leading-snug text-[#111] mb-3 flex-1">{product.name}</h3>
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-black text-[15px] text-[#111]">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-[12px] text-[#BBB] line-through font-medium">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <Star size={10} fill="#FFB800" className="text-[#FFB800]" />
          <span className="text-[10px] text-[#999] font-medium">4.7 · 156 reviews</span>
        </div>
      </Link>
    </div>
  )
}
