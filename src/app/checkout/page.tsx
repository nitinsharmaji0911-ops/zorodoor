'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShieldCheck, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, removeItem, clearCart, updateQuantity } = useCartStore()
  const [checkingOut, setCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = subtotal > 999 ? 0 : 99
  const total = subtotal + shipping

  const handleCheckout = () => {
    setCheckingOut(true)
    setTimeout(() => {
      setCheckingOut(false)
      setOrderComplete(true)
      clearCart()
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 max-w-lg mx-auto text-center">
        <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center text-white mb-8 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-4">Order Confirmed</h1>
        <p className="text-[#555] font-medium mb-8">
          Your order has been placed successfully. You will receive an email confirmation shortly with your tracking details.
        </p>
        <Link href="/" className="bg-[#111] text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#FF3B30] transition-colors">
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Your Cart is Empty</h1>
        <p className="text-[#888] mb-8 font-medium">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products" className="bg-[#111] text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#FF3B30] transition-colors">
          Shop T-Shirts
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="border border-[#EFEFEF] rounded-3xl overflow-hidden bg-white shadow-sm">
            <div className="bg-[#FAFAFA] border-b border-[#EFEFEF] px-6 py-4 flex justify-between items-center text-xs font-black uppercase tracking-widest text-[#555]">
              <span>Product</span>
              <span>Total</span>
            </div>
            
            <div className="divide-y divide-[#EFEFEF]">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="p-6 flex gap-6">
                  <div className="w-24 h-32 bg-[#F5F5F5] rounded-xl overflow-hidden relative flex-shrink-0 border border-[#EFEFEF]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-[#111] text-sm mb-1">{item.name}</h3>
                        <p className="text-xs text-[#888] uppercase font-bold tracking-widest mb-3">Size: {item.size}</p>
                      </div>
                      <p className="font-black text-[#111]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-4 bg-[#F5F5F5] rounded-lg px-2 border border-[#EBEBEB]">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center text-[#555] font-black hover:text-[#111]">
                          -
                        </button>
                        <span className="font-bold text-sm text-[#111] w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#555] font-black hover:text-[#111]">
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-[#999] hover:text-[#FF3B30] transition-colors p-2"
                        aria-label="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-[#0a0a0a] text-white rounded-3xl p-8 sticky top-[100px]">
            <h2 className="text-xl font-black uppercase tracking-tight mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm font-medium border-b border-[#333] pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-[#888]">Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Shipping</span>
                <span>{shipping === 0 ? <span className="text-[#10B981] font-bold">FREE</span> : `₹${shipping}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-base font-bold text-[#888]">Total</span>
              <span className="text-3xl font-black tracking-tighter">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full h-14 bg-white text-[#111] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#FF3B30] hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 group">
              {checkingOut ? 'Processing...' : (
                <>
                  Secure Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[#666] text-xs font-semibold">
              <ShieldCheck size={14} /> 100% Secure Payments
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
