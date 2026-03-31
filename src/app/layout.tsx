import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zorodoor.vercel.app'),
  title: "ZORODOOR | 100% Original Indian Streetwear",
  description: "Premium oversized graphic T-shirts. Made in India for those who dare to be different. 280gsm heavyweight cotton.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "ZORODOOR | Original Indian Streetwear",
    description: "Premium oversized graphic T-shirts. Made in India for those who dare to be different. 280gsm heavyweight cotton.",
    url: "https://zorodoor.vercel.app",
    siteName: "Zorodoor",
    images: [
      {
        url: "/products/anime_tee_eyes.png",
        width: 1200,
        height: 630,
        alt: "Zorodoor — Wake Up To Reality Graphic Tee",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZORODOOR | Original Indian Streetwear",
    description: "Premium oversized graphic T-shirts. Made in India.",
    images: ["/products/anime_tee_eyes.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS preconnect for critical third-parties */}
        <link rel="preconnect" href="https://hdpvyizvdrquhndznygr.supabase.co" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hdpvyizvdrquhndznygr.supabase.co" />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
