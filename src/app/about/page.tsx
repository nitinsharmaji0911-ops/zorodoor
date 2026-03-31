import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | ZORODOOR',
  description: 'Brutal self-expression through streetwear. Where anime meets fashion.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b border-[#EAEAEA] pb-8">
        About ZORO<span className="text-[#FF3B30]">DOOR</span>
      </h1>
      
      <div className="space-y-8 text-[#555] font-medium leading-relaxed text-sm md:text-base">
        <p className="text-xl text-[#111] font-bold">
          Brutal self-expression through streetwear. Where anime meets fashion.
        </p>
        
        <p>
          Founded on the streets of India, <strong>ZORODOOR</strong> is more than just a clothing brand. We are a movement dedicated to those who refuse to blend in. Our designs are strictly limited-run, extremely oversized, and unapologetically bold.
        </p>
        
        <p>
          We print exclusively on heavyweight <strong>280gsm 100% premium cotton</strong>, ensuring that every piece maintains its strict, boxy silhouette. Our aesthetic draws heavy inspiration from gothic art, brutalist architecture, and underground anime culture.
        </p>
        
        <p>
          No basic designs. No fast fashion materials. We build garments that make a statement the moment you enter a room.
        </p>
        
        <div className="mt-12 p-8 bg-[#0a0a0a] text-white rounded-2xl">
          <h2 className="text-sm font-black uppercase tracking-widest text-[#999] mb-4">The Manifesto</h2>
          <ul className="space-y-3 font-semibold list-disc pl-5">
            <li>100% Original Indian Streetwear.</li>
            <li>Uncompromising Quality (280gsm Minimum).</li>
            <li>Limited drops. Once it's gone, it's gone.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
