'use client'

import { Search, Eye, Download, MoreHorizontal } from 'lucide-react'

export default function AdminOrdersPage() {
  const orders = [
    { id: '#ZD-1042', customer: 'Kabir Singh', email: 'kabir@example.com', date: 'Today, 10:42 AM', items: 2, total: '₹3,998', status: 'Processing', payment: 'Paid' },
    { id: '#ZD-1041', customer: 'Aryan Patel', email: 'aryan.p@example.com', date: 'Today, 09:15 AM', items: 1, total: '₹1,999', status: 'Processing', payment: 'Paid' },
    { id: '#ZD-1040', customer: 'Rohan Sharma', email: 'rohan.s@example.com', date: 'Yesterday', items: 2, total: '₹4,198', status: 'Shipped', payment: 'COD' },
    { id: '#ZD-1039', customer: 'Aditya Gupta', email: 'aditya.g@example.com', date: 'Yesterday', items: 1, total: '₹2,199', status: 'Delivered', payment: 'Paid' },
    { id: '#ZD-1038', customer: 'Kunal Verma', email: 'kunal.v@example.com', date: 'Oct 12, 2023', items: 3, total: '₹6,197', status: 'Delivered', payment: 'Paid' },
    { id: '#ZD-1037', customer: 'Vikram Singh', email: 'vikram.s@example.com', date: 'Oct 11, 2023', items: 1, total: '₹1,999', status: 'Cancelled', payment: 'Refunded' },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2 text-[#111]">Orders</h1>
          <p className="text-[#666] font-medium">Manage and fulfill customer orders.</p>
        </div>
        <button className="bg-white border border-[#EAEAEA] text-[#111] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:border-[#111] transition-colors shadow-sm">
          <Download size={16} strokeWidth={2.5} /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#EAEAEA] shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#EAEAEA] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" size={16} />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              className="w-full bg-[#F5F5F5] border-none rounded-xl pl-12 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[#111]"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-[#F5F5F5] border-none rounded-xl px-4 py-3 text-sm font-bold text-[#555] outline-none">
              <option>Status: All</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <select className="bg-[#F5F5F5] border-none rounded-xl px-4 py-3 text-sm font-bold text-[#555] outline-none">
              <option>Date: Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>All Time</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#EAEAEA]">
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Order</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Date</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Customer</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Items</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Payment</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-[#999] text-[10px]">Status</th>
                <th className="py-4 px-6 font-black text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEFEF]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#F9F9F9] transition-colors group">
                  <td className="py-4 px-6">
                    <span className="font-black text-sm text-[#111]">{order.id}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-sm text-[#888]">{order.date}</td>
                  <td className="py-4 px-6">
                    <span className="block font-bold text-sm text-[#111]">{order.customer}</span>
                    <span className="block text-xs font-semibold text-[#888] mt-0.5">{order.email}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-sm text-[#555]">{order.items}</td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider ${
                      order.payment === 'Paid' ? 'bg-[#E0F2FE] text-[#0284C7]' :
                      order.payment === 'Refunded' ? 'bg-[#F1F5F9] text-[#475569]' :
                      'bg-[#FCE7F3] text-[#DB2777]'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${
                        order.status === 'Processing' ? 'bg-[#F59E0B]' :
                        order.status === 'Shipped' ? 'bg-[#3B82F6]' :
                        order.status === 'Cancelled' ? 'bg-[#EF4444]' :
                        'bg-[#10B981]'
                      }`}></span>
                      <span className="text-sm font-bold text-[#111]">
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg bg-white border border-[#EAEAEA] flex items-center justify-center text-[#555] hover:text-[#111] hover:border-[#111] transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-white border border-[#EAEAEA] flex items-center justify-center text-[#555] hover:text-[#111] hover:border-[#111] transition-all">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-[#EAEAEA] flex items-center justify-between text-sm font-medium text-[#888]">
          <span>Showing 1-6 of 142 orders</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[#EAEAEA] rounded hover:bg-[#111] hover:text-white transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-[#EAEAEA] rounded hover:bg-[#111] hover:text-white transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
