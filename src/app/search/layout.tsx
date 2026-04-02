import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search | ZORODOOR Street Wear Clothing Store',
  description:
    'Search the full ZORODOOR collection — India\'s premier street wear clothing store. Find oversized anime graphic T-shirts, limited drops, and exclusive streetwear pieces.',
  keywords: [
    'search streetwear',
    'ZORODOOR search',
    'street wear clothing store search',
    'find streetwear India',
    'buy oversized tshirt India',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/search',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
