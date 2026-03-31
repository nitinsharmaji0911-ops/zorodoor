import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ZORODOOR',
  description: 'Zorodoor Privacy Policy and Data Handling Information.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b border-[#EAEAEA] pb-8">
        Privacy Policy
      </h1>
      
      <div className="space-y-8 text-[#555] font-medium leading-relaxed text-sm">
        <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
        
        <p>
          At ZORODOOR, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit and use our website.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">1. Information We Collect</h2>
        <p>
          We collect information that you manually provide to us (such as name, email address, shipping address, and payment details) when placing an order or subscribing to our newsletter. We also automatically collect certain device information (such as IP address, browser type, and cookies) to improve your browsing experience.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To process and fulfill your orders, including sending shipping confirmations.</li>
          <li>To communicate with you regarding customer support inquiries.</li>
          <li>To send you updates about new drops and exclusive offers (only if you opted in).</li>
          <li>To analyze website traffic and optimize our store's performance.</li>
        </ul>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">3. Payment Security</h2>
        <p>
          All transactions are processed securely through our trusted payment gateway partner (Razorpay). We do not store or have access to your raw credit card or UPI details on our servers.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">4. Sharing Your Information</h2>
        <p>
          We do not sell, rent, or trade your personal information to third parties. We only share data with trusted service providers (like shipping partners and payment processors) strictly for the purpose of fulfilling your order.
        </p>

        <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mt-10 mb-4">5. Contact Us</h2>
        <p>
          For any questions regarding this Privacy Policy or your data, please contact us at <a href="mailto:privacy@zorodoor.in" className="text-[#111] font-bold underline">privacy@zorodoor.in</a>.
        </p>
      </div>
    </div>
  )
}
