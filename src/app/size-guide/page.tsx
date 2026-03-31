import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Size Guide | ZORODOOR',
  description: 'Zorodoor T-Shirt Size Guide. All our garments feature a strict oversized, boxy fit.',
}

export default function SizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
        Size Guide
      </h1>
      <p className="text-[#888] font-medium mb-10 border-b border-[#EAEAEA] pb-8 text-lg">
        All our garments are designed with a strict <strong className="text-[#111]">Oversized, Boxy Fit</strong>. If you prefer a regular fit, we recommend sizing down.
      </p>
      
      <div className="overflow-x-auto bg-[#FAFAFA] border border-[#EAEAEA] rounded-3xl p-2 md:p-6 mb-12">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-[#EAEAEA]">
              <th className="py-4 px-4 font-black uppercase tracking-widest text-xs text-[#999]">Size (Alpha)</th>
              <th className="py-4 px-4 font-black uppercase tracking-widest text-xs text-[#999]">Chest (Inches)</th>
              <th className="py-4 px-4 font-black uppercase tracking-widest text-xs text-[#999]">Length (Inches)</th>
              <th className="py-4 px-4 font-black uppercase tracking-widest text-xs text-[#999]">Shoulder (Inches)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA]">
            {[
              { size: 'S', chest: '44', length: '28', shoulder: '21' },
              { size: 'M', chest: '46', length: '29', shoulder: '22' },
              { size: 'L', chest: '48', length: '30', shoulder: '23' },
              { size: 'XL', chest: '50', length: '31', shoulder: '24' },
              { size: 'XXL', chest: '52', length: '32', shoulder: '25' },
            ].map((row) => (
              <tr key={row.size} className="hover:bg-white transition-colors">
                <td className="py-4 px-4 font-black text-[#111]">{row.size}</td>
                <td className="py-4 px-4 font-semibold text-[#555]">{row.chest}"</td>
                <td className="py-4 px-4 font-semibold text-[#555]">{row.length}"</td>
                <td className="py-4 px-4 font-semibold text-[#555]">{row.shoulder}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-[#EAEAEA] rounded-2xl">
          <h3 className="font-black uppercase tracking-tight text-xl mb-3">How to Measure</h3>
          <ul className="space-y-3 text-[#555] font-medium text-sm">
            <li><strong className="text-[#111]">Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
            <li><strong className="text-[#111]">Length:</strong> Measure from the highest point of the shoulder down to the hem.</li>
            <li><strong className="text-[#111]">Shoulder:</strong> Measure from shoulder seam to shoulder seam.</li>
          </ul>
        </div>
        <div className="p-8 bg-[#0a0a0a] text-white rounded-2xl">
          <h3 className="font-black uppercase tracking-tight text-xl mb-3 text-[#FF3B30]">Important Note</h3>
          <p className="text-[#888] font-medium text-sm leading-relaxed">
            Our t-shirts are made from heavy 280gsm cotton which experiences minimal shrinkage (under 2%) after the first wash. Do not size up to account for shrinkage.
          </p>
        </div>
      </div>
    </div>
  )
}
