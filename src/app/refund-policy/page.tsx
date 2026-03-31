import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | ZORODOOR',
  description: 'Learn about the Zorodoor refund and cancellation policy.',
}

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b border-[#EAEAEA] pb-8">
        Refund Policy
      </h1>
      
      <div className="space-y-8 text-[#555] font-medium leading-relaxed text-sm">
        <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
        
        <p>
          Thank you for shopping at <strong>ZORODOOR</strong>. Since we produce limited-run streetwear with premium 280gsm cotton, we have a straightforward and fair refund policy as outlined below.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">Eligibility for Refunds</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Refund requests must be initiated within <strong>7 days</strong> of delivery.</li>
          <li>Items must be unused, unwashed, and returned in their original packaging with all tags intact.</li>
          <li>Items marked as <strong>Sold Out</strong> or <strong>Final Sale</strong> are not eligible for refunds.</li>
          <li>Damages caused by misuse or normal wear are not covered.</li>
        </ul>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">Defective or Wrong Items</h2>
        <p>
          If you received a defective item or the wrong product, we will offer a full refund or free exchange with <strong>no questions asked</strong>. Please send us a photo of the item and your order details at <a href="mailto:support@zorodoor.in" className="text-[#111] font-bold underline">support@zorodoor.in</a>.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">How Refunds Are Processed</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Once your return is received and inspected, we will send a confirmation email.</li>
          <li>Approved refunds are processed back to your original payment method within <strong>5–7 business days</strong>.</li>
          <li>A reverse shipping deduction of <strong>₹100</strong> applies to all approved refunds (except defective/wrong items).</li>
        </ul>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">Order Cancellations</h2>
        <p>
          Orders can be cancelled within <strong>2 hours</strong> of placement by contacting us at support@zorodoor.in. After 2 hours, the order moves into our fulfilment process and cannot be cancelled.
        </p>
      </div>
    </div>
  )
}
