import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track Your Order | ZORODOOR Street Wear Clothing Store',
  description:
    'Track your ZORODOOR order in real time. Enter your Order ID to see the current delivery status. Fast 4–6 day shipping across India.',
  keywords: [
    'track order ZORODOOR',
    'ZORODOOR order status',
    'street wear clothing store order tracking',
    'streetwear India delivery tracking',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/track-order',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
