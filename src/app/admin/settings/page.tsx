'use client'

import { useState } from 'react'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2 text-[#111]">Store Settings</h1>
        <p className="text-[#666] font-medium">Manage your brand information and configuration.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand Info */}
        <div className="bg-white rounded-3xl border border-[#EAEAEA] shadow-sm p-8">
          <h2 className="font-black uppercase tracking-tight text-lg mb-6">Brand Information</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Store Name</label>
              <input type="text" defaultValue="ZORODOOR" className="w-full bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#111] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Tagline</label>
              <input type="text" defaultValue="Brutal self-expression through streetwear. Where anime meets fashion." className="w-full bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl px-4 py-3 font-medium text-sm outline-none focus:border-[#111] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Support Email</label>
              <input type="email" defaultValue="support@zorodoor.in" className="w-full bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl px-4 py-3 font-medium text-sm outline-none focus:border-[#111] transition-colors" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-3xl border border-[#EAEAEA] shadow-sm p-8">
          <h2 className="font-black uppercase tracking-tight text-lg mb-6">Social Media</h2>
          <div className="space-y-5">
            {[
              { label: 'Instagram', value: 'https://www.instagram.com/zorodoor/' },
              { label: 'Twitter / X', value: 'https://x.com/zorodoor' },
              { label: 'Facebook', value: 'https://www.facebook.com/profile.php?id=61582452247727' },
              { label: 'YouTube', value: 'http://youtube.com/@zorodoor' },
            ].map(s => (
              <div key={s.label}>
                <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">{s.label}</label>
                <input type="url" defaultValue={s.value} className="w-full bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl px-4 py-3 font-medium text-sm outline-none focus:border-[#111] transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Config */}
        <div className="bg-white rounded-3xl border border-[#EAEAEA] shadow-sm p-8">
          <h2 className="font-black uppercase tracking-tight text-lg mb-6">Shipping Config</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Free Shipping Threshold (₹)</label>
              <input type="number" defaultValue="999" className="w-full bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#111] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Standard Shipping Fee (₹)</label>
              <input type="number" defaultValue="99" className="w-full bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#111] transition-colors" />
            </div>
          </div>
        </div>

        <button type="submit" className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${saved ? 'bg-[#10B981] text-white' : 'bg-[#111] text-white hover:bg-[#FF3B30]'}`}>
          {saved ? '✓ Changes Saved' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
