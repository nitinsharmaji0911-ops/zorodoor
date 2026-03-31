import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'My Account | ZORODOOR' }

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const fullName  = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const avatarUrl = user.user_metadata?.avatar_url || null
  const initial   = fullName.charAt(0).toUpperCase()
  const email     = user.email || ''

  return (
    <div>
      <h1 className="text-3xl font-black uppercase tracking-tight mb-7">My Account</h1>

      {/* Edit Profile shortcut */}
      <Link href="/account/profile"
        className="group flex items-center justify-between bg-white border border-[#EAEAEA] hover:border-[#111] rounded-2xl p-5 mb-5 transition-colors">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt={fullName} className="w-12 h-12 rounded-full object-cover border border-[#EAEAEA]" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#111] to-[#444] flex items-center justify-center text-white text-lg font-black">
              {initial}
            </div>
          )}
          <div>
            <p className="font-black text-sm uppercase tracking-tight">{fullName}</p>
            <p className="text-[#888] text-xs font-medium mt-0.5">{email}</p>
            <p className="text-[#FF3B30] text-xs font-black uppercase tracking-widest mt-1">Edit Profile →</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-[#CCC] group-hover:text-[#111] transition-colors flex-shrink-0" />
      </Link>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <Link href="/account/orders"
          className="bg-white border border-[#EAEAEA] hover:border-[#111] rounded-2xl p-5 transition-colors group">
          <p className="text-2xl mb-2">📦</p>
          <p className="font-black text-sm uppercase tracking-tight">My Orders</p>
          <p className="text-[#999] text-xs font-medium mt-0.5">Track your drops</p>
        </Link>
        <Link href="/account/wishlist"
          className="bg-white border border-[#EAEAEA] hover:border-[#111] rounded-2xl p-5 transition-colors group">
          <p className="text-2xl mb-2">🖤</p>
          <p className="font-black text-sm uppercase tracking-tight">Wishlist</p>
          <p className="text-[#999] text-xs font-medium mt-0.5">Saved items</p>
        </Link>
      </div>

      {/* Shop CTA */}
      <div className="bg-[#0a0a0a] rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-black uppercase tracking-tight">New Drops Available</p>
          <p className="text-[#888] text-xs font-medium mt-1">Fresh streetwear just landed.</p>
        </div>
        <Link href="/products"
          className="flex-shrink-0 bg-[#FF3B30] text-white font-black uppercase tracking-widest text-xs px-5 py-3 rounded-xl hover:bg-white hover:text-[#111] transition-colors">
          Shop Now
        </Link>
      </div>
    </div>
  )
}
