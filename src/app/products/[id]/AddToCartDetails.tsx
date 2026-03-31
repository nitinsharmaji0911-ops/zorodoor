'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { ShoppingBag, Check, Heart } from 'lucide-react'

export default function AddToCartDetails({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0] || 'M')
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)
  
  const toggleWishlist = useWishlistStore(state => state.toggleItem)
  const isWishlistedStore = useWishlistStore(state => state.isInWishlist(product.id))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAdd = () => {
    addItem({ ...product, size: selectedSize })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const isWishlisted = mounted ? isWishlistedStore : false

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          <p className="font-black text-xs uppercase tracking-widest text-[#555]">Size</p>
          <button className="text-[10px] font-black uppercase text-[#999] hover:text-[#111] underline underline-offset-4">
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size: string) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              disabled={!product.inStock}
              className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                !product.inStock ? 'opacity-50 cursor-not-allowed bg-[#F5F5F5] text-[#999] border border-[#E0E0E0]' :
                selectedSize === size
                  ? 'bg-[#111] text-white shadow-md border border-[#111] scale-105'
                  : 'bg-white text-[#555] border border-[#E0E0E0] hover:border-[#111]'
              }`}>
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          disabled={!product.inStock || added}
          onClick={handleAdd}
          className={`flex-1 h-16 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
            !product.inStock
              ? 'bg-[#EAEAEA] text-[#999] cursor-not-allowed'
              : added
              ? 'bg-[#10B981] text-white'
              : 'bg-[#111] text-white hover:bg-[#FF3B30] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,59,48,0.3)]'
          }`}>
          {!product.inStock ? (
            'Sold Out'
          ) : added ? (
            <>
              <Check size={18} strokeWidth={3} /> Added To Cart
            </>
          ) : (
            <>
              <ShoppingBag size={18} strokeWidth={2.5} /> Add to Cart — ₹{product.price.toLocaleString('en-IN')}
            </>
          )}
        </button>
        
        <button 
          onClick={() => toggleWishlist(product)}
          className="w-16 h-16 rounded-2xl border border-[#EAEAEA] flex items-center justify-center bg-white hover:border-[#111] transition-colors"
        >
          <Heart size={20} strokeWidth={2.5} fill={isWishlisted ? '#FF3B30' : 'none'} className={isWishlisted ? 'text-[#FF3B30]' : 'text-[#666]'} />
        </button>
      </div>
    </div>
  )
}
