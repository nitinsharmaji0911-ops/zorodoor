import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ZORODOOR',
  description: 'Terms of Service governing the use of the Zorodoor website.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b border-[#EAEAEA] pb-8">
        Terms of Service
      </h1>
      
      <div className="space-y-8 text-[#555] font-medium leading-relaxed text-sm">
        <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
        
        <p>
          Welcome to ZORODOOR. By placing an order with us, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">1. General</h2>
        <p>
          These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">2. Products and Drops</h2>
        <p>
          Our apparel is produced in limited drops. We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. All descriptions of products or product pricing are subject to change at any time without notice, at the sole discretion of us.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">3. Accuracy of Billing and Account Information</h2>
        <p>
          We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">4. Intellectual Property</h2>
        <p>
          All graphics, logos, designs, page headers, button icons, scripts, and service names included in or made available through ZORODOOR are intellectual property of ZORODOOR. Unapproved use of these elements is strictly prohibited.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">5. Governing Law</h2>
        <p>
          These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.
        </p>
      </div>
    </div>
  )
}
