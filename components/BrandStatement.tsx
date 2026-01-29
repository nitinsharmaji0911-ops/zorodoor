"use client";

import { Star, Zap, Crown } from "lucide-react";

export function BrandStatement() {
  return (
    <section className="py-32 bg-[--color-primary-bg-secondary] text-[--color-text-primary] relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <Crown size={32} className="mx-auto mb-8 text-[--color-text-secondary] opacity-40" />
        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
          "We don't just sell clothes.<br />We armor your ambition."
        </h2>
        <p className="text-lg text-[--color-text-secondary] mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Quality that commands respect. Designs that demand attention. Welcome to the new standard
          of Indian streetwear.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-3xl mx-auto border-t border-[--color-border] pt-12">
          <div className="flex flex-col items-center gap-3">
            <Zap size={24} className="text-[--color-text-secondary] opacity-60" />
            <span className="text-sm font-bold tracking-widest uppercase text-[--color-text-primary]">
              Fast Shipping
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Star size={24} className="text-[--color-text-secondary] opacity-60" />
            <span className="text-sm font-bold tracking-widest uppercase text-[--color-text-primary]">
              Premium Cotton
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Crown size={24} className="text-[--color-text-secondary] opacity-60" />
            <span className="text-sm font-bold tracking-widest uppercase text-[--color-text-primary]">
              Limited Edition
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
