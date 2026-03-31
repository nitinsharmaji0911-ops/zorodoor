import { TrendingUp, Users, ShoppingBag, IndianRupee } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '₹0', icon: IndianRupee, change: '+0.0%' },
    { title: 'Total Orders', value: '0', icon: ShoppingBag, change: '+0.0%' },
    { title: 'Total Products', value: PRODUCTS.length.toString(), icon: ShoppingBag, change: 'Live' },
    { title: 'Conversion Rate', value: '0.0%', icon: TrendingUp, change: '0.0%' },
  ]

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-2 text-[#111]">Dashboard Overview</h1>
      <p className="text-[#666] font-medium mb-10">Welcome back. Here's what's happening today.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          const isPositive = stat.change.startsWith('+') || stat.change === 'Live'
          return (
            <div key={i} className="bg-white p-6 rounded-3xl border border-[#EAEAEA] shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="w-12 h-12 bg-[#F9F9F9] rounded-2xl flex items-center justify-center text-[#111]">
                  <Icon size={20} />
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${isPositive ? 'bg-[#D1FAE5] text-[#059669]' : 'bg-[#FEE2E2] text-[#DC2626]'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-[#666] font-bold text-sm tracking-wide uppercase mb-1">{stat.title}</h3>
              <p className="text-3xl font-black tracking-tighter text-[#111]">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List - Empty State */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#EAEAEA] shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111]">Recent Orders</h2>
          </div>
          <div className="text-center py-16 border-t border-[#EAEAEA]">
            <p className="text-5xl mb-4">💤</p>
            <p className="font-black text-lg uppercase tracking-tight mb-2">No orders yet</p>
            <p className="text-[#888] font-medium text-sm">When customers place orders, they will appear here.</p>
          </div>
        </div>

        {/* Top Products - Real Data */}
        <div className="bg-[#111] text-white rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6">Your Collection</h2>
          <div className="space-y-6">
            {PRODUCTS.slice(0, 4).map((prod, i) => (
              <div key={i} className="flex items-center justify-between border-b border-[#333] pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-bold text-sm mb-1 truncate max-w-[200px]">{prod.name}</h4>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${
                    prod.inStock ? 'text-[#10B981]' : 'text-[#FF3B30]' 
                  }`}>{prod.inStock ? 'In Stock' : 'Sold Out'}</span>
                </div>
                <div className="text-right">
                  <span className="block font-black text-lg">₹{prod.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
