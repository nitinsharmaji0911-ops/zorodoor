"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Upload, ArrowLeft, X } from "lucide-react";

export default function AddProductPage() {
    const router = useRouter();
    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        category: "Hoodies",
        gender: "Unisex",
        collections: "",
        description: "",
        images: [] as string[],
    });
    const [uploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setNewItem(prev => ({
                    ...prev,
                    images: [...prev.images, data.url]
                }));
            }
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setNewItem(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== indexToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newItem,
                    price: parseFloat(newItem.price),
                    collections: newItem.collections.split(',').map(c => c.trim()).filter(c => c),
                    sizes: ["S", "M", "L", "XL"], // Default sizes
                    features: ["Premium Quality", "Streetwear Fit"] // Default features
                }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
                router.refresh(); // Ensure dashboard updates
            }
        } catch (error) {
            console.error("Failed to add product", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[--color-primary-bg] p-4 lg:p-8">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/admin/dashboard"
                    className="inline-flex items-center gap-2 text-[--color-text-secondary] hover:text-[--color-accent-cyan] mb-6"
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>

                <div className="bg-[--color-bg-secondary] rounded-xl border border-[--color-border] p-6 lg:p-8">
                    <h1 className="text-3xl font-bold text-[--color-text-primary] mb-8">
                        Add New Product
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Product Name</label>
                                <Input
                                    value={newItem.name}
                                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                    placeholder="e.g. Graphic Oversized Hoodie"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Price ($)</label>
                                <Input
                                    type="number"
                                    value={newItem.price}
                                    onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Category</label>
                                <select
                                    className="w-full bg-[--color-bg-primary] border border-[--color-border] rounded-md px-4 py-2 text-[--color-text-primary] focus:border-[--color-accent-cyan] outline-none"
                                    value={newItem.category}
                                    onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                >
                                    <option value="Hoodies">Hoodies</option>
                                    <option value="T-Shirts">T-Shirts</option>
                                    <option value="Lower">Lower</option>
                                    <option value="Collectibles">Collectibles</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Gender</label>
                                <select
                                    className="w-full bg-[--color-bg-primary] border border-[--color-border] rounded-md px-4 py-2 text-[--color-text-primary] focus:border-[--color-accent-cyan] outline-none"
                                    value={newItem.gender}
                                    onChange={e => setNewItem({ ...newItem, gender: e.target.value })}
                                >
                                    <option value="Unisex">Unisex</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Collections (comma separated)</label>
                            <Input
                                value={newItem.collections}
                                onChange={e => setNewItem({ ...newItem, collections: e.target.value })}
                                placeholder="e.g. New Drop, Winter Essential"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Description</label>
                            <textarea
                                className="w-full bg-[--color-bg-primary] border border-[--color-border] rounded-md px-4 py-2 text-[--color-text-primary] min-h-[120px] focus:border-[--color-accent-cyan] outline-none"
                                value={newItem.description}
                                onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                placeholder="Product description..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[--color-text-secondary] mb-2">Product Images</label>

                            {/* Image Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                {newItem.images.map((img, i) => (
                                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-[--color-border] group">
                                        <Image src={img} alt="" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}

                                {/* Upload Button */}
                                <div className="relative aspect-square">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="file-upload"
                                        disabled={uploading}
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-[--color-border] rounded-lg cursor-pointer hover:border-[--color-accent-cyan] hover:text-[--color-accent-cyan] transition-colors text-[--color-text-secondary] bg-[--color-bg-primary]"
                                    >
                                        <Upload size={24} className="mb-2" />
                                        <span className="text-xs">{uploading ? "Uploading..." : "Add Image"}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t border-[--color-border]">
                            <Link href="/admin/dashboard">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create Product"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
