'use client'

import { useState } from 'react'
import { Package, CheckCircle } from 'lucide-react'

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<null | 'found' | 'not-found'>(null)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderId.trim().toLowerCase() === '#zd-1042' || orderId.trim().toLowerCase() === 'zd-1042') {
      setResult('found')
    } else {
      setResult('not-found')
    }
  }

  const steps = [
    { label: 'Order Placed', done: true, date: 'Mar 24, 10:42 AM' },
    { label: 'Payment Confirmed', done: true, date: 'Mar 24, 10:43 AM' },
    { label: 'Packed & Dispatched', done: false, date: 'Expected Mar 26' },
    { label: 'Out For Delivery', done: false, date: 'Expected Mar 28–30' },
    { label: 'Delivered', done: false, date: '' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 min-h-[60vh]">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 text-[#111]">Track Order</h1>
      <p className="text-[#888] font-medium mb-10">Enter your Order ID to see its current status.</p>

      <form onSubmit={handleTrack} className="space-y-4 mb-10">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Order ID</label>
          <input
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            placeholder="#ZD-1042"
            className="w-full border border-[#DDD] rounded-xl px-4 py-4 font-bold text-sm outline-none focus:border-[#111] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full border border-[#DDD] rounded-xl px-4 py-4 font-medium text-sm outline-none focus:border-[#111] transition-colors"
          />
        </div>
        <button className="w-full bg-[#111] text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#FF3B30] transition-colors">
          Track My Order
        </button>
      </form>

      {result === 'not-found' && (
        <div className="bg-[#FEE2E2] border border-[#FCA5A5] p-5 rounded-2xl text-sm font-bold text-[#991B1B]">
          No order found with that ID. Please check and try again. Contact <a href="mailto:support@zorodoor.in" className="underline">support@zorodoor.in</a> for help.
        </div>
      )}

      {result === 'found' && (
        <div className="bg-white border border-[#EAEAEA] rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Package size={24} className="text-[#111]" />
            <div>
              <h2 className="font-black text-lg text-[#111]">Order #ZD-1042</h2>
              <p className="text-sm font-medium text-[#888]">Zero Fucks Oversized Tee · Size L</p>
            </div>
            <span className="ml-auto bg-[#FEF3C7] text-[#D97706] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">Processing</span>
          </div>

          <div className="relative pl-6">
            {steps.map((step, i) => (
              <div key={i} className={`relative mb-8 last:mb-0 ${!step.done && 'opacity-40'}`}>
                <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${step.done ? 'bg-[#111] border-[#111]' : 'bg-white border-[#CCC]'}`}>
                  {step.done && <CheckCircle size={10} className="text-white" strokeWidth={3} />}
                </div>
                {i < steps.length - 1 && (
                  <div className={`absolute -left-[18px] top-5 w-0.5 h-8 ${step.done ? 'bg-[#111]' : 'bg-[#DDD]'}`} />
                )}
                <h3 className="font-black text-sm text-[#111]">{step.label}</h3>
                {step.date && <p className="text-xs text-[#888] font-medium mt-0.5">{step.date}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
