import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | ZORODOOR Street Wear Clothing Store',
  description:
    'Sign in to your ZORODOOR account to track orders, manage your wishlist, and get early access to exclusive street wear drops. India\'s boldest clothing store.',
  keywords: [
    'ZORODOOR login',
    'street wear clothing store sign in',
    'ZORODOOR account',
    'streetwear India account login',
  ],
  alternates: {
    canonical: 'https://zorodoor.store/login',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
