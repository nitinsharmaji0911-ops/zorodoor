import { Metadata } from 'next'
import SearchClient from './SearchClient'

export const metadata: Metadata = {
  title: 'Search Products | ZORODOOR Street Wear Clothing Store',
  description: 'Search for India\'s boldest oversized anime streetwear at ZORODOOR. Find your favorite graphic t-shirts and urban styles from our limited collections.',
  keywords: [
    'search streetwear India',
    'find anime tshirts',
    'ZORODOOR products search',
    'street wear clothing store search',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/search',
  },
}

export default function SearchPage() {
  return <SearchClient />
}
