"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/contexts/UserContext";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Package, LogOut, User as UserIcon, Calendar, MapPin } from "lucide-react";

export default function AccountPage() {
    const { user, orders, isAuthenticated, logout } = useUser();
    const router = useRouter();

    useEffect(() => {
        // Redirect to login if not authenticated
        // We use a small timeout to allow session to load
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push("/login?callbackUrl=/account");
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F2ED] dark:bg-black">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-300 dark:bg-gray-800 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-800 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F2ED] dark:bg-black text-black dark:text-white py-12 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">My Account</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">Welcome back, {user.firstName || "Member"}.</p>
                    </div>
                    <Button onClick={logout} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                        <LogOut size={18} className="mr-2" /> Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black">
                                    <UserIcon size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{user.firstName} {user.lastName}</h3>
                                    <p className="text-sm text-zinc-500 break-all">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                    <MapPin size={18} />
                                    <span>{user.city || "No address saved"}</span>
                                </div>
                                {/* Add more profile details or edit button here */}
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
                            <Package className="text-cyan-500" /> Order History
                        </h2>

                        {orders.length === 0 ? (
                            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-200 dark:border-zinc-800">
                                <Package size={48} className="mx-auto text-zinc-300 mb-4" />
                                <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                                <p className="text-zinc-500 mb-6">You haven't placed any orders yet. It's time to change that.</p>
                                <Link href="/shop">
                                    <Button variant="primary">Start Shopping</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all hover:border-cyan-500/50">
                                        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap justify-between items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-black dark:bg-white text-white dark:text-black font-bold px-3 py-1 rounded text-xs uppercase tracking-wider">
                                                    {order.status}
                                                </div>
                                                <div className="text-sm text-zinc-500 flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(order.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="font-bold text-lg">
                                                {formatPrice(order.total)}
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4">
                                                        <div className="relative h-16 w-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                            {item.image && (
                                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-sm">{item.name}</h4>
                                                            <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                                                        </div>
                                                        <div className="font-medium text-sm">
                                                            {formatPrice(item.price)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
