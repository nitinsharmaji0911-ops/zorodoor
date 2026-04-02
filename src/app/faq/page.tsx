import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | ZORODOOR Street Wear Clothing Store',
  description: 'Frequently asked questions about ZORODOOR — India\'s top street wear clothing store. Find answers about sizing, fabric quality, shipping, COD, and returns.',
  keywords: [
    'ZORODOOR FAQ',
    'street wear clothing store FAQ',
    'streetwear India shipping FAQ',
    'oversized tshirt sizing guide India',
    'ZORODOOR COD returns',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/faq',
  },
}

const FAQS = [
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes, we offer Cash on Delivery (COD) across most major pin codes in India. A nominal handling fee may apply to COD orders."
  },
  {
    question: "How does the sizing work? Should I size up?",
    answer: "No, please do not size up. All our t-shirts are strictly designed with a boxy, oversized fit. Order your standard true-to-size alpha size (M, L, etc.) and it will naturally be oversized. Check our Size Guide for exact dimensions."
  },
  {
    question: "What material do you use?",
    answer: "We use ultra-premium, heavyweight 280gsm 100% Cotton. It is pre-shrunk, deeply dyed, and designed to drape heavily. We do not use thin, basic cotton."
  },
  {
    question: "Will the graphic print fade after washing?",
    answer: "We use high-density screen printing, puff printing, and premium DTG techniques that are cured at high temperatures. To ensure longevity, always wash cold, inside out, and never iron directly on the print."
  },
  {
    question: "How long until I receive my order?",
    answer: "Once dispatched (usually within 48 hours), standard Pan-India delivery takes 4-6 business days depending on your location."
  },
  {
    question: "An item I want is 'Sold Out'. Will it restock?",
    answer: "Most of our drops are limited runs. We occasionally do restocks for Best Sellers if the demand is massive, but the best way to secure a piece is to buy it during the initial drop."
  }
]

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b border-[#EAEAEA] pb-8">
        Frequently Asked Questions
      </h1>
      
      <div className="space-y-6">
        {FAQS.map((faq, index) => (
          <div key={index} className="bg-[#FAFAFA] border border-[#EAEAEA] p-6 rounded-2xl hover:border-[#111] transition-colors">
            <h3 className="text-lg font-black uppercase tracking-tight text-[#111] mb-3">
              {faq.question}
            </h3>
            <p className="text-[#555] font-medium leading-relaxed text-sm">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-8 bg-[#0a0a0a] text-white rounded-3xl text-center">
        <h2 className="text-xl font-black uppercase tracking-tight mb-3">Still have questions?</h2>
        <p className="text-[#888] font-medium mb-6">Hit us up on email or Instagram. We reply fast.</p>
        <a href="/contact" className="inline-block bg-white text-[#111] font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-[#FF3B30] transition-colors">
          Contact Support
        </a>
      </div>
    </div>
  )
}
