import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductDetailsClient from "./ProductDetailsClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

// Force dynamic rendering since we're fetching from DB
export const dynamic = 'force-dynamic';

async function getProduct(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug }
        });
        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

async function getRelatedProducts(category: string, currentProductId: string) {
    try {
        const products = await prisma.product.findMany({
            where: {
                category: category,
                id: { not: currentProductId }
            },
            take: 4,
            orderBy: { createdAt: 'desc' }
        });
        return products;
    } catch (error) {
        console.error("Error fetching related products:", error);
        return [];
    }
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(product.category, product.id);

    return (
        <div className="bg-[--color-primary-bg] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-[--color-text-secondary] hover:text-[--color-accent-cyan] transition-colors mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Shop
                </Link>

                <Breadcrumbs
                    items={[
                        { label: "Shop", href: "/shop" },
                        { label: product.category, href: `/shop?category=${product.category}` },
                        { label: product.name },
                    ]}
                />

                <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
            </div>
        </div>
    );
}
