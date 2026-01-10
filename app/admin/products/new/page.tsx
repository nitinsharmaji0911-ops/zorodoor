"use client";

import { createProduct } from "@/app/actions/admin";
import Button from "@/components/ui/Button";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function AddProductPage() {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Upload failed');
            }

            const data = await response.json();
            setImageUrl(data.url);
        } catch (error: any) {
            alert("Error uploading image: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/products" className="inline-flex items-center gap-2 text-[#6B5E52] hover:text-[#2C2420] mb-6">
                <ArrowLeft size={20} />
                Back to Products
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-[#EBE7E0] p-8">
                <h2 className="text-2xl font-bold text-[#2C2420] mb-6">Add New Product</h2>

                <form action={createProduct} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#6B5E52] mb-1">Product Name</label>
                        <div className="text-black">
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="e.g. Graphic Hoodie"
                                className="w-full px-4 py-3 bg-white border border-[#EBE7E0] rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[#6B5E52] mb-1">Price ($)</label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                required
                                placeholder="0.00"
                                className="w-full px-4 py-3 bg-white border border-[#EBE7E0] rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#6B5E52] mb-1">Stock Quantity</label>
                            <input
                                name="stock"
                                type="number"
                                required
                                placeholder="100"
                                className="w-full px-4 py-3 bg-white border border-[#EBE7E0] rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#6B5E52] mb-1">Category</label>
                        <select
                            name="category"
                            className="w-full px-4 py-3 bg-white border border-[#EBE7E0] rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors"
                        >
                            <option value="Hoodies">Hoodies</option>
                            <option value="T-Shirts">T-Shirts</option>
                            <option value="Lower">Lower</option>
                            <option value="Collectibles">Collectibles</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#6B5E52] mb-1">Description</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            placeholder="Product description..."
                            className="w-full px-4 py-3 bg-white border border-[#EBE7E0] rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#6B5E52] mb-1">Product Image</label>

                        {!imageUrl ? (
                            <div className="border-2 border-dashed border-[#EBE7E0] rounded-lg p-6 text-center hover:border-[#8B7355] transition-colors relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                />
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className={`w-8 h-8 text-[#6B5E52] ${uploading ? 'animate-bounce' : ''}`} />
                                    <p className="text-sm text-[#6B5E52]">
                                        {uploading ? "Uploading..." : "Click to upload image"}
                                    </p>
                                    <p className="text-xs text-[#6B5E52]/60">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full h-48 bg-gray-50 rounded-lg overflow-hidden border border-[#EBE7E0]">
                                <Image src={imageUrl} alt="Uploaded preview" fill className="object-contain" />
                                <button
                                    type="button"
                                    onClick={() => setImageUrl("")}
                                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                                >
                                    <X size={16} className="text-red-500" />
                                </button>
                            </div>
                        )}

                        {/* Hidden input to send URL to server action */}
                        <input type="hidden" name="images" value={imageUrl} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#6B5E52] mb-1">Sizes (Comma separated)</label>
                        <input
                            name="sizes"
                            type="text"
                            defaultValue="S, M, L, XL"
                            placeholder="S, M, L, XL"
                            className="w-full px-4 py-3 bg-white border border-[#EBE7E0] rounded-lg focus:outline-none focus:border-[#8B7355] transition-colors"
                        />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" variant="primary" className="w-full" disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
