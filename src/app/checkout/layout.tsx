import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | ZORODOOR Street Wear Clothing Store',
  description:
    'Complete your order at ZORODOOR — India\'s best street wear clothing store. Secure checkout with UPI, cards, and COD. Free shipping above ₹999.',
  keywords: [
    'ZORODOOR checkout',
    'buy streetwear India',
    'street wear clothing store checkout',
    'order streetwear online India',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/checkout',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
