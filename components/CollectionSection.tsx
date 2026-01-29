"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
}

export function CollectionSection({ products }: { products: Product[] }) {
  return (
    <section className="py-24 px-6 max-w-[1440px] mx-auto bg-[--color-primary-bg-secondary]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[--color-border] pb-8">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-[--color-text-secondary] uppercase mb-2 block">
            Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[--color-text-primary] tracking-tight">
            LATEST DROPS
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden md:flex items-center gap-2 text-[--color-text-primary] font-medium hover:text-[--color-text-secondary] transition-colors mt-4 md:mt-0"
        >
          VIEW ALL <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group relative aspect-3/4 overflow-hidden bg-[--color-primary-bg]"
            >
              <Image
                src={product.images[0] || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">${product.price.toFixed(2)}</span>
                  <span className="text-white/80 text-xs font-bold tracking-widest uppercase inline-block border-b border-transparent group-hover:border-white transition-all">
                    View Product
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 text-[--color-text-secondary]">
            No products found. Check back soon!
          </div>
        )}
      </div>

      <div className="mt-12 flex justify-center md:hidden">
        <Link
          href="/shop"
          className="flex items-center gap-2 text-[--color-text-primary] font-bold hover:underline underline-offset-4"
        >
          VIEW ALL <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
