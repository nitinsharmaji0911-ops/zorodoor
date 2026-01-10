import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductDetailsClient from "./ProductDetailsClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {
    const product = await prisma.product.findUnique({
        where: { slug },
    });

    if (!product) return null;

    return {
        ...product,
        images: JSON.parse(product.images),
        sizes: JSON.parse(product.sizes),
        features: JSON.parse(product.features)
    };
}

async function getRelatedProducts(category: string, currentProductId: string) {
    const products = await prisma.product.findMany({
        where: {
            category,
            id: { not: currentProductId }
        },
        take: 4
    });

    return products.map(p => ({
        ...p,
        images: JSON.parse(p.images),
        sizes: JSON.parse(p.sizes),
        features: JSON.parse(p.features)
    }));
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
