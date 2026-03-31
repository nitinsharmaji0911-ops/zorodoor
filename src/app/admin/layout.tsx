'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const links = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#EAEAEA] flex flex-col hidden md:flex h-screen sticky top-0">
        <div className="h-20 flex items-center px-8 border-b border-[#EAEAEA]">
          <Link href="/" className="font-black text-2xl tracking-tighter text-[#111]">
            ZORO<span className="text-[#FF3B30]">DOOR</span>
            <span className="ml-2 text-[10px] bg-[#111] text-white px-2 py-0.5 rounded uppercase tracking-widest align-super">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-[#111] text-white shadow-md' 
                    : 'text-[#666] hover:bg-[#F9F9F9] hover:text-[#111]'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm tracking-wide">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[#EAEAEA]">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-[#FF3B30] hover:bg-[#FFF0F0] transition-colors">
            <LogOut size={18} />
            <span className="text-sm tracking-wide">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-[#EAEAEA] flex items-center px-4 justify-between sticky top-0 z-10">
          <Link href="/" className="font-black text-xl tracking-tighter text-[#111]">
            ZORO<span className="text-[#FF3B30]">DOOR</span>
          </Link>
          <button className="w-10 h-10 border border-[#EAEAEA] rounded-lg flex items-center justify-center">
            {/* Simple hamburger icon */}
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-[#111]"></span>
              <span className="block w-5 h-0.5 bg-[#111]"></span>
            </div>
          </button>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
