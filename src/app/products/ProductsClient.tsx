'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS, type Product } from '@/lib/products'

const FILTER_TABS = [
  { label: 'All', value: 'all' },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Best Sellers', value: 'bestsellers' },
  { label: 'Anime Drops', value: 'anime' },
]

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialFilter = searchParams.get('filter') || 'all'

  const [activeTab, setActiveTab] = useState(initialFilter)
  const [sortOrder, setSortOrder] = useState('Sort: Featured')

  // Keep state in sync with URL filter param if it changes from outside (like header click)
  useEffect(() => {
    const filterFromUrl = searchParams.get('filter')
    if (filterFromUrl && filterFromUrl !== activeTab) {
      setActiveTab(filterFromUrl)
    }
  }, [searchParams])

  const handleTabClick = (value: string) => {
    setActiveTab(value)
    // Update URL without full reload
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    if (value === 'all') {
      current.delete('filter')
    } else {
      current.set('filter', value)
    }
    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.replace(`/products${query}`, { scroll: false })
  }

  // Derived state: filtered and sorted products
  let displayProducts = [...PRODUCTS]

  if (activeTab === 'new') {
    displayProducts = displayProducts.filter(p => p.badge?.includes('NEW') || p.tags.includes('new'))
  } else if (activeTab === 'bestsellers') {
    displayProducts = displayProducts.filter(p => p.badge?.includes('BESTSELLER') || p.badge?.includes('TRENDING') || p.badge?.includes('CULT Drop') || p.badge?.includes('CULT DROP'))
  } else if (activeTab === 'anime') {
    displayProducts = displayProducts.filter(p => p.tags.includes('anime'))
  }

  if (sortOrder === 'Price: Low to High') {
    displayProducts.sort((a, b) => a.price - b.price)
  } else if (sortOrder === 'Price: High to Low') {
    displayProducts.sort((a, b) => b.price - a.price)
  } else if (sortOrder === 'Newest First') {
    // Just reversing them works reasonably well as a pseudo newest first, or checking tags
    const newItems = displayProducts.filter(p => p.badge?.includes('NEW') || p.tags.includes('new'))
    const otherItems = displayProducts.filter(p => !(p.badge?.includes('NEW') || p.tags.includes('new')))
    displayProducts = [...newItems, ...otherItems]
  }

  return (
    <>
      {/* Filter Tabs */}
      <div className="sticky top-[60px] z-30 bg-white border-b border-[#E8E8E8] py-3 px-4 md:px-8 overflow-x-auto">
        <div className="max-w-[1400px] mx-auto flex gap-2">
          {FILTER_TABS.map((tab) => (
            <button key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`flex-shrink-0 text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors ${
                activeTab === tab.value ? 'bg-[#0a0a0a] text-white' : 'bg-[#F5F5F5] text-[#111] hover:bg-[#0a0a0a] hover:text-white'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#999] text-xs font-bold">{displayProducts.length} Products</p>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-xs font-bold bg-[#F5F5F5] border-0 rounded-full px-4 py-2 outline-none cursor-pointer">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.length > 0 ? (
            displayProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="font-black text-xl uppercase tracking-tight mb-2">No products found</p>
              <p className="text-[#888] font-medium text-sm">Try changing your filters.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
