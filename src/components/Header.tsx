'use client'

import Link from 'next/link'
import Logo from '@/components/Logo'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { createClient } from '@/lib/supabase/client'
import { Search, User, ShoppingBag, Menu, Heart } from 'lucide-react'

const NAV_LINKS = [
  { label: 'T-Shirts', href: '/products' },
  { label: 'New Arrivals', href: '/products?filter=new' },
  { label: 'Best Sellers', href: '/products?filter=bestsellers' },
]

export default function Header() {
  const items = useCartStore((state) => state.items)
  const wishlistItems = useWishlistStore((state) => state.items)
  const [mounted, setMounted] = useState(false)
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const wishlistCount = wishlistItems.length
  const [mobileOpen, setMobileOpen] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [userInitial, setUserInitial] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setMounted(true)
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setIsLoggedIn(true)
        setAvatarUrl(user.user_metadata?.avatar_url || null)
        setUserInitial((user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase())
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Account')
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      if (user) {
        setIsLoggedIn(true)
        setAvatarUrl(user.user_metadata?.avatar_url || null)
        setUserInitial((user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase())
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Account')
      } else {
        setIsLoggedIn(false)
        setAvatarUrl(null)
        setUserInitial(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#0a0a0a] text-white overflow-hidden py-2 relative z-50">
        <div className="animate-marquee inline-flex whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-[11px] font-bold tracking-[0.16em] uppercase mr-12">
              🔥 Free Shipping Above ₹999 &nbsp;|&nbsp; 100% Original Indian Streetwear &nbsp;|&nbsp; Easy Returns &nbsp;|&nbsp; COD Available
            </span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EBEBEB]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-[60px] flex items-center justify-between gap-4">
          <button className="md:hidden flex-shrink-0" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={22} strokeWidth={2} />
          </button>

          <Link href="/" className="absolute left-[50%] -translate-x-[50%] md:static md:translate-x-0 flex-shrink-0 flex items-center hover:opacity-80 transition-opacity" aria-label="ZORODOOR Home">
            <Logo className="w-[120px] md:w-[150px] h-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-[13px] font-bold text-[#111] hover:text-[#FF3B30] transition-colors tracking-wide uppercase">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Search → full search page */}
            <Link href="/search" className="hover:opacity-60 transition-opacity" aria-label="Search">
              <Search size={20} strokeWidth={2} />
            </Link>

            {/* Wishlist */}
            <Link href="/account/wishlist" className="relative hover:opacity-60 transition-opacity hidden sm:block" aria-label="Wishlist">
              <Heart size={20} strokeWidth={2} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[9px] w-4 h-4 bg-[#111] text-white rounded-full flex items-center justify-center font-black">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User — auth-aware */}
            {mounted && isLoggedIn ? (
              <Link href="/account/profile" className="hidden sm:flex items-center gap-2 group transition-all duration-300 py-1 pl-1 pr-1 hover:pr-4 rounded-full border border-transparent hover:bg-[#F5F5F5] hover:border-[#EAEAEA]">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-[#E0E0E0] shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center text-white text-[12px] font-black shrink-0">
                    {userInitial}
                  </div>
                )}
                <span className="text-[12px] font-black text-[#111] opacity-0 max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {userName}
                </span>
              </Link>
            ) : (
              <Link href="/login" className="hover:opacity-60 transition-opacity hidden sm:block">
                <User size={20} strokeWidth={2} />
              </Link>
            )}

            <Link href="/checkout" className="relative hover:opacity-60 transition-opacity">
              <ShoppingBag size={20} strokeWidth={2} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[9px] w-4 h-4 bg-[#FF3B30] text-white rounded-full flex items-center justify-center font-black">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#E0E0E0] z-50 shadow-lg">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="block px-6 py-4 text-sm font-black uppercase tracking-wide border-b border-[#F0F0F0] hover:bg-[#F5F5F5]">
                {link.label}
              </Link>
            ))}
            <Link href="/search" onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 text-sm font-black uppercase tracking-wide border-b border-[#F0F0F0] hover:bg-[#F5F5F5]">
              Search
            </Link>
            <Link href="/account/wishlist" onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 text-sm font-black uppercase tracking-wide border-b border-[#F0F0F0] hover:bg-[#F5F5F5]">
              Wishlist {mounted && wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link href={isLoggedIn ? '/account/profile' : '/login'} onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 text-sm font-black uppercase tracking-wide hover:bg-[#F5F5F5]">
              {isLoggedIn ? 'My Account' : 'Sign In'}
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
