"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Trash2, Plus } from "lucide-react";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    inStock: boolean;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token) {
            router.push("/admin");
            return;
        }
        fetchProducts();
    }, [router]);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-[--color-primary-bg] p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[--color-text-primary]">
                        Admin Dashboard
                    </h1>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => router.push("/admin/add-product")}
                            variant="primary"
                            className="flex items-center gap-2"
                        >
                            <Plus size={20} /> Add Product
                        </Button>
                    </div>
                </div>

                {/* Product List */}
                <div className="bg-[--color-bg-secondary] rounded-lg border border-[--color-border] overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[--color-bg-primary] border-b border-[--color-border]">
                            <tr>
                                <th className="p-4 text-sm font-medium text-[--color-text-secondary]">Product</th>
                                <th className="p-4 text-sm font-medium text-[--color-text-secondary]">Category</th>
                                <th className="p-4 text-sm font-medium text-[--color-text-secondary]">Price</th>
                                <th className="p-4 text-sm font-medium text-[--color-text-secondary]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[--color-border]">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-[--color-text-secondary]">
                                        No products found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-[--color-bg-primary]/50">
                                        <td className="p-4 flex items-center gap-4">
                                            <div className="relative w-12 h-12 bg-gray-200 rounded overflow-hidden">
                                                {product.images[0] && (
                                                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                                )}
                                            </div>
                                            <span className="font-medium text-[--color-text-primary]">{product.name}</span>
                                        </td>
                                        <td className="p-4 text-[--color-text-secondary]">{product.category}</td>
                                        <td className="p-4 text-[--color-text-primary] font-bold">${product.price}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:text-red-400 p-2 rounded hover:bg-red-500/10 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
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
