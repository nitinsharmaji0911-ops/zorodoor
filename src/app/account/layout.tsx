import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { User, Package, Heart, Settings, ChevronRight } from 'lucide-react'

const NAV = [
  { name: 'Profile',    href: '/account/profile',   icon: User },
  { name: 'My Orders',  href: '/account/orders',    icon: Package },
  { name: 'Wishlist',   href: '/account/wishlist',  icon: Heart },
  { name: 'Settings',   href: '/account/settings',  icon: Settings },
]

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const fullName  = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const avatarUrl = user.user_metadata?.avatar_url || null
  const initial   = fullName.charAt(0).toUpperCase()
  const email     = user.email || ''

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 min-h-[70vh]">
      <div className="flex flex-col md:flex-row gap-8">

        {/* ── Sidebar ── */}
        <aside className="w-full md:w-60 flex-shrink-0">

          {/* Avatar card */}
          <div className="bg-[#0a0a0a] text-white rounded-2xl p-5 mb-3">
            {avatarUrl ? (
              <img src={avatarUrl} alt={fullName}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#333] mb-3" />
            ) : (
              <div className="w-14 h-14 bg-[#252525] rounded-full flex items-center justify-center text-xl font-black mb-3">
                {initial}
              </div>
            )}
            <p className="font-black text-base leading-tight truncate" title={fullName}>{fullName}</p>
            <p className="text-[#777] text-xs font-medium mt-1 truncate" title={email}>{email}</p>
          </div>

          {/* Nav links */}
          <nav className="space-y-0.5">
            {NAV.map(({ name, href, icon: Icon }) => (
              <Link key={href} href={href}
                className="flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm text-[#555] hover:bg-[#F5F5F5] hover:text-[#111] transition-colors group">
                <span className="flex items-center gap-3">
                  <Icon size={15} />
                  {name}
                </span>
                <ChevronRight size={13} className="opacity-0 group-hover:opacity-60 transition-opacity" />
              </Link>
            ))}
          </nav>
        </aside>

        {/* ── Page content ── */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

      </div>
    </div>
  )
}
