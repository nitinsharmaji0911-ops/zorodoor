"use client";

import React, { useState } from "react";
import { useUser } from "@/lib/contexts/UserContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Package, User as UserIcon, LogOut, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, isAuthenticated, logout, orders, login } = useUser();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses">("profile");

    // Login State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Mock Addresses State
    const [addresses, setAddresses] = useState([
        { id: 1, type: "Home", address: "123 Street Name", city: "City", state: "State", zip: "12345", default: true },
        { id: 2, type: "Work", address: "456 Office Plaza", city: "Work City", state: "State", zip: "67890", default: false }
    ]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 max-w-md mx-auto w-full">
                <h1 className="text-3xl font-bold mb-8 text-[--color-text-primary] text-center">
                    Login / Register
                </h1>

                <form
                    className="w-full space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        login(email, password);
                    }}
                >
                    <div>
                        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Email</label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button variant="primary" type="submit" className="w-full mt-4">
                        Sign In
                    </Button>
                </form>

                <p className="mt-4 text-sm text-[--color-text-secondary]">
                    For demo purposes, use any email/password.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    <div className="p-6 bg-[--color-bg-secondary] rounded-lg border border-[--color-border] mb-6 text-center">
                        <div className="w-20 h-20 bg-[--color-accent-cyan] rounded-full mx-auto mb-4 flex items-center justify-center text-black text-2xl font-bold">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>
                        <h2 className="text-xl font-bold text-[--color-text-primary]">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-sm text-[--color-text-secondary]">{user?.email}</p>
                    </div>

                    <nav className="space-y-1">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "profile"
                                ? "bg-[--color-accent-cyan] text-black font-semibold"
                                : "text-[--color-text-secondary] hover:bg-[--color-bg-secondary] hover:text-[--color-text-primary]"
                                }`}
                        >
                            <UserIcon size={20} />
                            Profile Details
                        </button>
                        <button
                            onClick={() => setActiveTab("addresses")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "addresses"
                                ? "bg-[--color-accent-cyan] text-black font-semibold"
                                : "text-[--color-text-secondary] hover:bg-[--color-bg-secondary] hover:text-[--color-text-primary]"
                                }`}
                        >
                            <MapPin size={20} />
                            Saved Addresses
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "orders"
                                ? "bg-[--color-accent-cyan] text-black font-semibold"
                                : "text-[--color-text-secondary] hover:bg-[--color-bg-secondary] hover:text-[--color-text-primary]"
                                }`}
                        >
                            <Package size={20} />
                            My Orders
                        </button>
                        <button
                            onClick={() => {
                                logout();
                                router.push("/");
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-red-500 hover:bg-[--color-bg-secondary] transition-colors"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {activeTab === "profile" && (
                        <div className="bg-[--color-bg-secondary] rounded-lg border border-[--color-border] p-6 lg:p-8">
                            <h2 className="text-2xl font-bold text-[--color-text-primary] mb-6">Profile Settings</h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">First Name</label>
                                        <div className="text-[--color-text-primary] p-3 border border-[--color-border] rounded-md bg-[--color-bg-primary]">
                                            {user?.firstName}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Last Name</label>
                                        <div className="text-[--color-text-primary] p-3 border border-[--color-border] rounded-md bg-[--color-bg-primary]">
                                            {user?.lastName}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Email</label>
                                    <div className="text-[--color-text-primary] p-3 border border-[--color-border] rounded-md bg-[--color-bg-primary]">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "addresses" && (
                        <div className="bg-[--color-bg-secondary] rounded-lg border border-[--color-border] p-6 lg:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-[--color-text-primary]">Saved Addresses</h2>
                                <Button variant="primary" size="sm" onClick={() => setIsAddressModalOpen(true)}>
                                    + Add New Address
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {addresses.map((addr) => (
                                    <div key={addr.id} className="p-4 border border-[--color-border] rounded-lg bg-[--color-bg-primary] flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-[--color-text-primary]">{addr.type}</span>
                                                {addr.default && (
                                                    <span className="text-xs bg-[--color-accent-cyan] text-black px-2 py-0.5 rounded-full font-medium">Default</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-[--color-text-secondary]">
                                                {addr.address}<br />
                                                {addr.city}, {addr.state} {addr.zip}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="text-sm text-[--color-text-secondary] hover:text-[--color-accent-cyan]">Edit</button>
                                            {!addr.default && (
                                                <button className="text-sm text-red-500 hover:text-red-400">Delete</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-[--color-text-primary] mb-6">Order History</h2>

                            {orders.length === 0 ? (
                                <div className="text-center py-12 bg-[--color-bg-secondary] rounded-lg border border-[--color-border]">
                                    <Package className="mx-auto text-[--color-text-secondary] mb-4" size={48} />
                                    <p className="text-[--color-text-primary] text-lg font-medium">No orders yet</p>
                                    <p className="text-[--color-text-secondary]">Start shopping to see your orders here.</p>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="bg-[--color-bg-secondary] rounded-lg border border-[--color-border] p-6 hover:border-[--color-accent-cyan] transition-colors"
                                    >
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-[--color-text-primary]">{order.id}</h3>
                                                <p className="text-sm text-[--color-text-secondary]">{new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-semibold bg-[--color-bg-primary] border border-[--color-border] text-[--color-text-primary] uppercase">
                                                {order.status}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-[--color-text-secondary]">{order.items} Items</span>
                                            <span className="text-lg font-bold text-[--color-accent-cyan]">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
