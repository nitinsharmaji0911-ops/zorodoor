import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import ProductRowActions from "./ProductRowActions";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-[#2C2420]">Products</h2>
                    <p className="text-[#6B5E52]">Manage your inventory.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-[#2C2420] text-[#EBE7E0] px-4 py-2 rounded-lg hover:bg-[#2C2420]/80 transition-colors"
                >
                    <Plus size={20} />
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#EBE7E0] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#F5F2ED] text-[#6B5E52] uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-4">Image</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBE7E0]">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-[#6B5E52] italic">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => {
                                    // Postgres returns string[], no JSON.parse needed
                                    const images = product.images;
                                    return (
                                        <tr key={product.id} className="hover:bg-[#F5F2ED]/50 transition-colors">
                                            <td className="p-4">
                                                <div className="w-12 h-12 relative rounded-md overflow-hidden bg-gray-100">
                                                    {images[0] && (
                                                        <Image src={images[0]} alt={product.name} fill className="object-cover" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 font-medium text-[#2C2420] max-w-xs truncate" title={product.name}>
                                                {product.name}
                                            </td>
                                            <td className="p-4 text-[#6B5E52] text-sm">
                                                {product.category}
                                            </td>
                                            <td className="p-4 font-bold text-[#2C2420]">${product.price.toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700' :
                                                    product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {product.stock} in stock
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <ProductRowActions id={product.id} />
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
