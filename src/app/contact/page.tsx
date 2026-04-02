import { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us | ZORODOOR Street Wear Clothing Store',
  description: 'Reach out to ZORODOOR — India\'s boldest street wear clothing store. Have questions about your order, sizing, or a recent drop? Contact our team via email, Instagram, or our studio HQ.',
  keywords: [
    'contact ZORODOOR',
    'ZORODOOR customer support',
    'street wear clothing store contact',
    'Nitin Sharma contact',
    'streetwear India support',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/contact',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
