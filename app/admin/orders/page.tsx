import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: true,
            items: true
        }
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-[#2C2420]">Orders</h2>
                <p className="text-[#6B5E52]">Manage customer orders.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#EBE7E0] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#F5F2ED] text-[#6B5E52] uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Items</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBE7E0]">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-[#6B5E52] italic">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-[#F5F2ED]/50 transition-colors">
                                        <td className="p-4 font-mono text-xs text-[#2C2420]">{order.id}</td>
                                        <td className="p-4 font-medium text-[#2C2420]">
                                            {order.user?.name || order.user?.email || "Unknown"}
                                        </td>
                                        <td className="p-4 text-[#6B5E52] text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-bold text-[#2C2420]">${order.total.toFixed(2)}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'PAID' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[#6B5E52]">
                                            {order.items.length} items
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
