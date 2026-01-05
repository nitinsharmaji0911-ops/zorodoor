"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import productsData from "@/data/products.json";
import { ChevronDown } from "lucide-react";

function ShopContent() {
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get("category") || "all"
    );
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured");

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const categories = [
        { value: "all", label: "All Products" },
        { value: "hoodies", label: "Hoodies" },
        { value: "t-shirts", label: "T-Shirts" },
        { value: "lower", label: "Lower" },
    ];

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    // Update local state when URL params change
    React.useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
        setSelectedCategory(searchParams.get("category") || "all");
    }, [searchParams]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = productsData.products.filter((product) => {
            // Search Filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchName = product.name.toLowerCase().includes(query);
                const matchDesc = product.description.toLowerCase().includes(query);
                const matchCat = product.category.toLowerCase().includes(query);

                if (!matchName && !matchDesc && !matchCat) return false;
            }

            // Category filter
            if (
                selectedCategory !== "all" &&
                product.category.toLowerCase() !== selectedCategory.toLowerCase() &&
                // Handle case where category might be singular/plural mismatch
                !selectedCategory.toLowerCase().includes(product.category.toLowerCase())
            ) {
                return false;
            }

            // Price filter
            if (product.price < priceRange[0] || product.price > priceRange[1]) {
                return false;
            }

            // Size filter
            if (
                selectedSizes.length > 0 &&
                !product.sizes.some((size) => selectedSizes.includes(size))
            ) {
                return false;
            }

            return true;
        });

        // Sort
        if (searchQuery && sortBy === "featured") {
            // Do not filter out non-featured/out-of-stock items if searching
        } else {
            switch (sortBy) {
                case "newest":
                    filtered = filtered.filter((p) => p.newArrival);
                    break;
                case "price-asc":
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case "price-desc":
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case "featured":
                default:
                    filtered = filtered.filter((p) => p.featured || p.inStock);
            }
        }

        return filtered;
    }, [selectedCategory, priceRange, selectedSizes, sortBy, searchQuery]);

    const toggleSize = (size: string) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    const clearFilters = () => {
        setSelectedCategory("all");
        setPriceRange([0, 200]);
        setSelectedSizes([]);
        setSortBy("featured");
    };

    return (
        <div className="bg-[--color-primary-bg] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs items={[{ label: "Shop" }]} />

                <div className="mt-6">
                    <h1 className="text-4xl font-bold text-[--color-text-primary] mb-2">
                        SHOP ALL
                    </h1>
                    <p className="text-[--color-text-secondary] mb-6">
                        {filteredAndSortedProducts.length} products found
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Filters Sidebar */}
                    <aside className="hidden lg:block bg-[--color-primary-bg-secondary] border border-[--color-border] rounded-lg p-6 h-fit sticky top-20">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[--color-text-primary]">
                                FILTERS
                            </h2>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-[--color-accent-cyan] hover:text-[--color-accent-pink] transition-colors"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-[--color-text-primary] mb-3">
                                CATEGORY
                            </h3>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <label
                                        key={cat.value}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="category"
                                            value={cat.value}
                                            checked={selectedCategory === cat.value}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-4 h-4 text-[--color-accent-cyan] bg-[--color-primary-bg] border-[--color-border] focus:ring-[--color-accent-cyan]"
                                        />
                                        <span className="ml-2 text-sm text-[--color-text-secondary]">
                                            {cat.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-[--color-text-primary] mb-3">
                                PRICE RANGE
                            </h3>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={priceRange[1]}
                                    onChange={(e) =>
                                        setPriceRange([0, parseInt(e.target.value)])
                                    }
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-[--color-text-secondary]">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-[--color-text-primary] mb-3">
                                SIZES
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => toggleSize(size)}
                                        className={`px-3 py-1 text-sm rounded border transition-all ${selectedSizes.includes(size)
                                            ? "bg-[--color-accent-cyan] text-black border-[--color-accent-cyan]"
                                            : "bg-[--color-primary-bg] text-[--color-text-secondary] border-[--color-border] hover:border-[--color-accent-cyan]"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Sort */}
                        <div className="flex items-center justify-between mb-6 bg-[--color-primary-bg-secondary] border border-[--color-border] rounded-lg p-4">
                            <span className="text-sm text-[--color-text-secondary]">
                                Sort By:
                            </span>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-[--color-primary-bg] border border-[--color-border] text-[--color-text-primary] text-sm rounded-lg px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:border-[--color-accent-cyan]"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                                <ChevronDown
                                    size={16}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[--color-text-secondary] pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* Products */}
                        {filteredAndSortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredAndSortedProducts.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-xl text-[--color-text-secondary]">
                                    No products found. Try adjusting your filters.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}
