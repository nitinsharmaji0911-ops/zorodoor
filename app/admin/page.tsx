import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
    const orderCount = await prisma.order.count();
    const productCount = await prisma.product.count();
    const userCount = await prisma.user.count();

    // Basic stats
    const stats = [
        { label: "Total Revenue", value: "$0.00", change: "0%" }, // Mock for now
        { label: "Total Orders", value: orderCount.toString(), change: "0%" },
        { label: "Products", value: productCount.toString(), change: "0%" },
        { label: "Customers", value: userCount.toString(), change: "0%" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-[#2C2420]">Dashboard</h2>
                <p className="text-[#6B5E52]">Overview of your store's performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-[#EBE7E0]">
                        <h3 className="text-sm font-bold text-[#6B5E52] uppercase tracking-wider mb-2">{stat.label}</h3>
                        <div className="flex items-end justify-between">
                            <span className="text-3xl font-black text-[#2C2420]">{stat.value}</span>
                            <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-[#EBE7E0] overflow-hidden">
                <div className="p-6 border-b border-[#EBE7E0]">
                    <h3 className="text-lg font-bold text-[#2C2420]">Recent Orders</h3>
                </div>
                <div className="p-6 text-center text-[#6B5E52] italic">
                    No recent orders found.
                </div>
            </div>
        </div>
    );
}
