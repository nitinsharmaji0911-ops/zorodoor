"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/products/ProductCard";

// Real Data with Correct Paths
const featuredProducts = [
  {
    id: "1",
    name: "UNTITLED. Heavyweight Hoodie",
    slug: "untitled-heavyweight-hoodie",
    price: 120.00,
    images: ["/products/untitled_hoodie.png"],
    category: "Hoodies",
    isNew: true,
    inStock: true,
    description: "Minimalist perfection. 500gsm heavyweight cotton for the ultimate drape.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 42
  },
  {
    id: "2",
    name: "Priest 'Age' Graphic Hoodie",
    slug: "priest-age-graphic-hoodie",
    price: 110.00,
    images: ["/products/priest_hoodie_front.png", "/products/priest_hoodie_graphic.png"],
    category: "Hoodies",
    isNew: true,
    inStock: true,
    description: "Provocative design meeting premium comfort. Puff print text on front, high-detail graphic on back.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 18
  },
  {
    id: "3",
    name: "Zero Fucks Oversized Tee",
    slug: "zero-fucks-oversized-tee",
    price: 65.00,
    images: ["/products/zero_fucks_tshirt.png"],
    category: "T-Shirts",
    isNew: false,
    inStock: true,
    description: "Statement piece. Boxy fit, drop shoulders, 280gsm cotton.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: "4",
    name: "Just Chilling Palm Tee",
    slug: "just-chilling-palm-tee",
    price: 65.00,
    images: ["/products/just_chilling_tshirt.png"],
    category: "T-Shirts",
    isNew: true,
    inStock: true,
    description: "Laid back vibes only. Contrast white puff print on deep black cotton.",
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: "5",
    name: "BlueLoc Oversized Hoodie",
    slug: "blueloc-oversized-hoodie",
    price: 99.99,
    images: ["/products/blueloc_hoodie_front_1767604938655.png", "/products/blueloc_hoodie_back_1767604957835.png"],
    category: "Hoodies",
    isNew: false,
    inStock: true,
    description: "Premium heavyweight cotton hoodie featuring exclusive BlueLoc artwork. Oversized fit for maximum comfort.",
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 124
  },
  {
    id: "6",
    name: "Demon Slayer Hoodie",
    slug: "demon-slayer-hoodie",
    price: 109.99,
    images: ["/products/demon_slayer_hoodie_1767604977764.png"],
    category: "Hoodies",
    isNew: false,
    inStock: true,
    description: "High-quality puff print featuring Nezuko. 450 GSM French Terry cotton.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: "7",
    name: "Goku Dragon Oversized T-Shirt",
    slug: "goku-dragon-element-tee",
    price: 64.99,
    images: ["/products/goku_tshirt_front_1767605011952.png"],
    category: "T-Shirts",
    isNew: false,
    inStock: false,
    description: "Vintage wash tee with detailed dragon ball print. Boxy fit.",
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewCount: 56
  },
  {
    id: "8",
    name: "Berserk Oversized T-Shirt",
    slug: "berserk-oversized-tee",
    price: 59.99,
    images: ["/products/berserk_tshirt_front_1767604993809.png"],
    category: "T-Shirts",
    isNew: false,
    inStock: true,
    description: "Guts graphic on heavyweight charcoal tee. Distressed finish.",
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 210
  }
];

const categories = [
  { name: "Hoodies", image: "/products/untitled_hoodie.png", href: "/shop?category=hoodies" },
  { name: "T-Shirts", image: "/products/zero_fucks_tshirt.png", href: "/shop?category=t-shirts" },
  { name: "Lower", image: "/products/untitled_hoodie.png", href: "/shop?category=lower" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Cinematic Hero Section */}
      {/* Cinematic Hero Section - Premium Minimalist */}
      <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[#F5F2ED] pt-20">

        {/* Abstract Background Texture (Subtle Noise) */}
        <div className="absolute inset-0 z-0 opacity-[0.05] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>

        {/* CENTER: Abstract "Spirit of the Court" Graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
          {/* Soft, Warm Glow (Premium Streetwear Vibe) */}
          <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-gradient-to-tr from-[#E65100]/10 via-[#8B7355]/5 to-transparent blur-[100px] animate-pulse-slow"></div>
          {/* Subtle Ring (Minimalist Basketball Reference) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[750px] md:h-[750px] rounded-full border border-[#2C2420]/5 opacity-60"></div>
        </div>

        {/* CENTER CONTENT */}
        <div className="relative z-20 text-center max-w-5xl px-6 space-y-10 animate-fade-in-up mt-[-30px]">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#EBE7E0]/50 backdrop-blur-md border border-[#E8E2D8] mb-4">
            <Star size={12} className="text-[#8B7355] fill-[#8B7355]" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-[#6B5E52]">Premium Anime Streetwear</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#2C2420] tracking-tighter leading-[0.85] text-balance drop-shadow-sm">
            EXPRESS<br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#2C2420] via-[#8B7355] to-[#2C2420] bg-300% animate-gradient pb-2">
              YOURSELF
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#6B5E52] max-w-xl mx-auto font-medium leading-relaxed">
            Unapologetically bold. High-end anime aesthetics for the concrete jungle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 w-full">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button size="xl" variant="primary" className="w-full shadow-2xl shadow-[#8B7355]/20 hover:shadow-[#8B7355]/30 hover:-translate-y-1 transition-all duration-300">
                Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/shop?category=hoodies" className="w-full sm:w-auto">
              <Button size="xl" variant="outline" className="w-full bg-transparent border-[#2C2420]/20 hover:bg-[#2C2420] hover:text-[#F5F2ED] hover:border-transparent transition-all duration-300">
                Explore Hoodies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-24 w-full bg-[#F5F2ED]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#2C2420] tracking-tight mb-2">NEW DROP</h2>
              <p className="text-[#6B5E52]">Fresh heavyweights just landed.</p>
            </div>
            <Link href="/shop">
              <Button variant="link" className="hidden sm:flex group">
                View All Products <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link href="/shop">
              <Button variant="outline" size="lg" className="w-full">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories / curated */}
      <section className="py-24 bg-[#EBE7E0]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#2C2420] tracking-tight mb-12 text-center">CURATED COLLECTIONS</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group relative h-[500px] overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-[#2C2420] transition-colors" />
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
                  <div className="bg-white/95 backdrop-blur-md px-8 py-4 rounded-xl transform transition-transform duration-300 group-hover:scale-110">
                    <span className="text-xl font-bold text-[#2C2420] uppercase tracking-widest">{cat.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
