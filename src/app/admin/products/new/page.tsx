'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Save, AlertCircle } from 'lucide-react'

export default function NewProductDrop() {
  const [loading, setLoading] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      setLoading(false)
      setShowWarning(true)
    }, 800)
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      <div className="mb-8">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#999] hover:text-[#111] transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Products
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2 text-[#111]">Drop New Artifact</h1>
        <p className="text-[#666] font-medium">Add a new streetwear item to the collection.</p>
      </div>

      {showWarning && (
        <div className="mb-8 bg-[#FFF0F0] border border-[#FF3B30] text-[#DC2626] p-6 rounded-2xl flex items-start gap-4">
          <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-black uppercase tracking-wide text-sm mb-1">Database Mode Required</h3>
            <p className="text-sm font-medium">Add New Drop functionality currently disabled in the UI. Products are currently managed purely in code at <span className="font-mono bg-[#FFEAEA] px-1.5 py-0.5 rounded text-[11px]">src/lib/products.ts</span> for maximum performance. Database integration arriving in v2.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Core Info */}
        <div className="bg-white p-8 rounded-3xl border border-[#EAEAEA] shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#999] mb-6 mb-6">Core Information</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#111] mb-2 uppercase tracking-wide">Product Title</label>
              <input type="text" required placeholder="e.g. Sinner Oversized Heavyweight Tee" className="w-full bg-[#f5f5f5] border-none rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#111] transition-shadow" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#111] mb-2 uppercase tracking-wide">Price (₹)</label>
                <input type="number" required placeholder="2499" className="w-full bg-[#f5f5f5] border-none rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#111] transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#111] mb-2 uppercase tracking-wide">Original Price (₹)</label>
                <input type="number" placeholder="2999" className="w-full bg-[#f5f5f5] border-none rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#111] transition-shadow" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#111] mb-2 uppercase tracking-wide">Description</label>
              <textarea rows={4} required placeholder="Describe the vibe, the fit, and the message..." className="w-full bg-[#f5f5f5] border-none rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#111] transition-shadow resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white p-8 rounded-3xl border border-[#EAEAEA] shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#999] mb-6">Media</h2>
          
          <div className="w-full border-2 border-dashed border-[#EAEAEA] rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-[#111] transition-colors cursor-pointer bg-[#FAFAFA]">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Upload size={20} className="text-[#111]" />
            </div>
            <p className="font-bold text-sm text-[#111] mb-1">Click to upload flatlay image</p>
            <p className="text-xs font-medium text-[#888]">PNG, JPG, WEBP up to 5MB</p>
          </div>
        </div>

        {/* Categories & Badges */}
        <div className="bg-white p-8 rounded-3xl border border-[#EAEAEA] shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#999] mb-6">Metadata</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#111] mb-2 uppercase tracking-wide">Category</label>
              <select className="w-full bg-[#f5f5f5] border-none rounded-xl px-4 py-3.5 text-sm font-bold text-[#555] outline-none appearance-none">
                <option>T-Shirts</option>
                <option>Sweatshirts</option>
                <option>Hoodies</option>
                <option>Bottoms</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#111] mb-2 uppercase tracking-wide">Drop Badge</label>
              <input type="text" placeholder="e.g. 🆕 NEW DROP" className="w-full bg-[#f5f5f5] border-none rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#111] transition-shadow" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link href="/admin/products" className="px-6 py-4 rounded-xl font-bold text-sm text-[#555] hover:bg-[#F5F5F5] transition-colors">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#111] disabled:bg-[#555] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#FF3B30] transition-colors"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} strokeWidth={3} />}
            {loading ? 'Processing...' : 'Save Product'}
          </button>
        </div>

      </form>
    </div>
  )
}
