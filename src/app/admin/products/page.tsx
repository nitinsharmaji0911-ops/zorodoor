'use client'

import { Plus, Search, MoreVertical, Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'

export default function AdminProductsPage() {
  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2 text-[#111]">Products</h1>
          <p className="text-[#666] font-medium">Manage your streetwear drops and inventory.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-[#111] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#FF3B30] transition-colors"
        >
          <Plus size={16} strokeWidth={3} /> Add New Drop
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-[#EAEAEA] shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#EAEAEA] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-[#f5f5f5] border-none rounded-xl pl-12 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[#111]"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-[#f5f5f5] border-none rounded-xl px-4 py-3 text-sm font-bold text-[#555] outline-none">
              <option>All Categories</option>
              <option>T-Shirts</option>
              <option>Sweatshirts</option>
            </select>
            <select className="bg-[#f5f5f5] border-none rounded-xl px-4 py-3 text-sm font-bold text-[#555] outline-none">
              <option>Status</option>
              <option>Active</option>
              <option>Sold Out</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#EAEAEA]">
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Product</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Price</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Inventory</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Status</th>
                <th className="py-4 px-6 font-black text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEFEF]">
              {PRODUCTS.map((p) => (
                <tr key={p.id} className="hover:bg-[#F9F9F9] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-[#F5F5F5] rounded-lg overflow-hidden relative border border-[#EAEAEA]">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-[#111] leading-tight block max-w-[200px] truncate">{p.name}</span>
                        <span className="block text-[10px] font-bold text-[#999] mt-1 uppercase tracking-widest">{p.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-black text-sm text-[#111]">₹{p.price}</td>
                  <td className="py-4 px-6 font-bold text-sm text-[#555]">
                    {p.inStock ? 'Available' : 'Out of Stock'}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider ${
                      p.inStock ? 'bg-[#D1FAE5] text-[#059669]' : 'bg-[#FEE2E2] text-[#DC2626]'
                    }`}>
                      {p.inStock ? 'Active' : 'Sold Out'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg bg-white border border-[#EAEAEA] flex items-center justify-center text-[#555] hover:text-[#111] hover:border-[#111] transition-all">
                        <Edit size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-white border border-[#EAEAEA] flex items-center justify-center text-[#555] hover:text-[#FF3B30] hover:border-[#FF3B30] transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-[#EAEAEA] flex items-center justify-between text-sm font-medium text-[#888]">
          <span>Showing {PRODUCTS.length} products</span>
        </div>
      </div>
    </div>
  )
}
