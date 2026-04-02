import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | ZORODOOR Street Wear Clothing Store',
  description:
    'Get in touch with ZORODOOR — India\'s top street wear clothing store. Reach out for order support, drop questions, or collaborations. We respond within 24 hours.',
  keywords: [
    'contact ZORODOOR',
    'street wear clothing store contact',
    'ZORODOOR customer support',
    'streetwear store India contact',
    'zorodoor.store help',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/contact',
  },
  openGraph: {
    title: 'Contact ZORODOOR | Street Wear Clothing Store',
    description:
      'Reach out to ZORODOOR — India\'s boldest street wear clothing store. We reply within 24 hours.',
    url: 'https://zorodoor.store/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
