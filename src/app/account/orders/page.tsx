import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'My Orders | ZORODOOR' }

export default function OrdersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">My Orders</h1>
          <p className="text-[#888] font-medium mt-1 text-sm">Track and manage your drops</p>
        </div>
        <Link href="/products"
          className="bg-[#111] text-white font-black uppercase tracking-widest text-xs px-5 py-3 rounded-xl hover:bg-[#FF3B30] transition-colors">
          Shop Now
        </Link>
      </div>

      {/* Empty state */}
      <div className="bg-white border border-[#EAEAEA] rounded-2xl p-16 text-center">
        <p className="text-5xl mb-4">📦</p>
        <p className="font-black text-lg uppercase tracking-tight mb-2">No orders yet</p>
        <p className="text-[#888] text-sm font-medium mb-6">You haven&apos;t placed any orders. Time to drop something fire.</p>
        <Link href="/products"
          className="inline-block bg-[#111] text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-[#FF3B30] transition-colors">
          Browse Collection
        </Link>
      </div>
    </div>
  )
}
