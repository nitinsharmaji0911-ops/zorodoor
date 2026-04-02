import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping & Returns | ZORODOOR Street Wear Clothing Store',
  description: 'Shipping and returns information for ZORODOOR — India\'s top street wear clothing store. Free Pan-India delivery, 4–6 day dispatch, and 7-day easy return policy.',
  keywords: [
    'ZORODOOR shipping policy',
    'street wear clothing store shipping India',
    'free shipping streetwear India',
    'ZORODOOR returns policy',
    'streetwear India delivery',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/shipping',
  },
}

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b border-[#EAEAEA] pb-8">
        Shipping & Returns
      </h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Shipping Policy</h2>
          <div className="space-y-4 text-[#555] font-medium leading-relaxed">
            <p>
              We know you want your gear fast. That's why we offer <strong>Free Pan-India Delivery</strong> on all orders.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Dispatch Time:</strong> All orders are processed and dispatched within 48 hours of confirmation.</li>
              <li><strong>Delivery Time:</strong> Expect your package within 4-6 business days after dispatch, depending on your location.</li>
              <li><strong>Tracking:</strong> Once your order is dispatched, you will receive a tracking link via email and SMS.</li>
            </ul>
            <p className="text-sm bg-[#F9F9F9] p-4 rounded-xl border border-[#EAEAEA] mt-4">
              <strong>Note:</strong> During limited drop events, dispatch times may be extended by 1-2 business days due to high volume.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Returns & Exchanges</h2>
          <div className="space-y-4 text-[#555] font-medium leading-relaxed">
            <p>
              We stand by the quality of our heavy cotton. If your item arrives damaged or you received the wrong size, we've got you covered with our <strong>7 Days Easy Return Policy</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Returns must be initiated within 7 days of delivery.</li>
              <li>The garment must be unworn, unwashed, and have all original tags attached.</li>
              <li>We offer free exchanges for sizing issues. For refunds, a nominal reverse-shipping fee of ₹100 is deducted.</li>
            </ul>
            <p className="mt-4">
              To initiate a return, contact us at <a href="mailto:support@zorodoor.in" className="text-[#111] font-bold underline">support@zorodoor.in</a> with your Order ID.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
