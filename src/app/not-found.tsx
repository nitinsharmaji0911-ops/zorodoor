import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Big 404 */}
      <div className="relative mb-8">
        <span className="text-[180px] md:text-[280px] font-black text-[#F5F5F5] leading-none select-none tracking-tighter">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center font-black tracking-tight text-[#111] text-2xl md:text-4xl">
          PAGE NOT FOUND
        </span>
      </div>
      
      <p className="text-[#888] font-medium text-lg max-w-md mb-10 leading-relaxed">
        This drop doesn't exist — or it sold out before we could link it. Either way, it's gone.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="bg-[#111] text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-[#FF3B30] transition-colors">
          Back To Home
        </Link>
        <Link href="/products" className="border border-[#111] text-[#111] font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-[#111] hover:text-white transition-colors">
          Shop T-Shirts
        </Link>
      </div>
    </div>
  )
}
