import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductDetailsClient from "./ProductDetailsClient";
import { readFileSync } from "fs";
import { join } from "path";
// import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {
    const filePath = join(process.cwd(), 'data', 'products.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    const product = data.products.find((p: any) => p.slug === slug);

    if (!product) return null;

    return product;
}

async function getRelatedProducts(category: string, currentProductId: string) {
    const filePath = join(process.cwd(), 'data', 'products.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    const products = data.products
        .filter((p: any) => p.category === category && p.id !== currentProductId)
        .slice(0, 4);

    return products;
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
