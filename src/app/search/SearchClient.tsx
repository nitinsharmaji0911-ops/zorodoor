'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, ArrowUpRight } from 'lucide-react'
import { PRODUCTS, searchProducts, type Product } from '@/lib/products'

const POPULAR = ['Anime', 'Samurai', 'Cyberpunk', 'Oversized', 'Black']

function SearchResultCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null
  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col bg-white border border-[#EAEAEA] hover:border-[#111] rounded-2xl overflow-hidden transition-colors">
      <div className="relative aspect-[4/5] bg-[#F5F5F5] overflow-hidden">
        <Image src={product.image} alt={product.name} fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, 33vw" />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#0a0a0a] text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wider">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-[#FF3B30] text-white text-[10px] font-black px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-bold text-[12px] text-[#111] leading-snug truncate">{product.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-black text-sm">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-[#BBB] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>
        <ArrowUpRight size={14} className="text-[#CCC] group-hover:text-[#111] flex-shrink-0 mt-0.5 transition-colors" />
      </div>
    </Link>
  )
}

function SearchInner() {
  const router = useRouter()
  const params = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState(params.get('q') || '')
  const results = query.trim() ? searchProducts(query) : []

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      const url = query.trim() ? `/search?q=${encodeURIComponent(query)}` : '/search'
      router.replace(url, { scroll: false })
    }, 200)
    return () => clearTimeout(t)
  }, [query])

  return (
    <div className="min-h-screen bg-white">
      {/* Search bar */}
      <div className="sticky top-[60px] z-30 bg-white border-b border-[#EAEAEA] px-4 md:px-8 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-2xl px-4 py-3.5">
            <Search size={18} className="text-[#999] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search t-shirts, styles, vibes..."
              className="flex-1 bg-transparent text-sm font-medium text-[#111] placeholder-[#AAA] outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-[#999] hover:text-[#111] transition-colors">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        {!query.trim() && (
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-4">Popular Searches</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {POPULAR.map(term => (
                <button key={term} onClick={() => setQuery(term)}
                  className="bg-[#F5F5F5] hover:bg-[#111] hover:text-white text-[#111] text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-full transition-colors">
                  {term}
                </button>
              ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-4">All Products</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PRODUCTS.map(p => <SearchResultCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {query.trim() && results.length > 0 && (
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-4">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {results.map(p => <SearchResultCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-black text-xl uppercase tracking-tight mb-2">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-[#888] font-medium text-sm mb-8">Try a different keyword or browse all products.</p>
            <button onClick={() => setQuery('')}
              className="bg-[#111] text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-[#FF3B30] transition-colors">
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#111] border-t-transparent rounded-full animate-spin"/></div>}>
      <SearchInner />
    </Suspense>
  )
}
