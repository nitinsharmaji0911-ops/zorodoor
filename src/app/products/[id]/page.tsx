import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartDetails from './AddToCartDetails'
import { PRODUCTS } from '@/lib/products'

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) return { title: 'Not Found' }
  return {
    title: `${product.name} | ZORODOOR`,
    description: product.description,
    openGraph: { images: [product.image] }
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) notFound()

  return (
    <div className="bg-white min-h-screen pt-4 pb-20">

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-6">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#999]">
          <Link href="/" className="hover:text-[#111] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#111] transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-[#111]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20">

          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] bg-[#F5F5F5] overflow-hidden rounded-3xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-[#0a0a0a] text-white text-xs font-black px-3 py-1.5 rounded-full tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 flex flex-col pt-4 md:pt-10">
            <p className="text-[#999] text-xs font-black uppercase tracking-widest mb-3">{product.category}</p>
            <h1 className="font-black text-[#111] leading-[1.1] tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="font-black text-2xl text-[#111]">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-lg text-[#999] line-through font-semibold">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <AddToCartDetails product={product} />

            <div className="mt-12 border-t border-[#EAEAEA] pt-8">
              <h3 className="font-black uppercase tracking-widest text-sm mb-4">Description</h3>
              <p className="text-[#555] font-medium text-sm leading-relaxed mb-6">{product.description}</p>
              <ul className="space-y-2 mb-8">
                {product.features.map((f, i) => (
                  <li key={i} className="flex gap-3 text-[#555] font-medium text-sm items-center">
                    <span className="w-1.5 h-1.5 bg-[#FF3B30] rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#EAEAEA] pt-8 bg-[#FDFDFD] p-6 rounded-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-1">Shipping</h4>
                  <p className="text-[#888] text-xs font-medium">Free Pan-India Delivery (4-6 Days)</p>
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-1">Returns</h4>
                  <p className="text-[#888] text-xs font-medium">7 Days Easy Return Policy</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
