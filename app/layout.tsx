import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/contexts/CartContext";
import { WishlistProvider } from "@/lib/contexts/WishlistContext";
import { UserProvider } from "@/lib/contexts/UserContext";
import { ToastProvider } from "@/components/ui/Toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://zorodoor.com'),
  title: "Zorodoor - Brutal Self-Expression Through Streetwear",
  description:
    "Gen Z streetwear brand featuring anime-inspired hoodies, t-shirts, and lowers. Premium quality, oversized fits, and designs that speak louder than words.",
  keywords: [
    "streetwear",
    "anime clothing",
    "oversized hoodies",
    "graphic tees",
    "gen z fashion",
    "zorodoor",
    "urban wear",
    "premium streetwear india"
  ],
  authors: [{ name: "Nitin Sharma", url: "https://www.linkedin.com/in/nitin-sharma-503645290/" }],
  creator: "Nitin Sharma",
  publisher: "Zorodoor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zorodoor.com",
    title: "Zorodoor - Premium Anime Streetwear",
    description: "Brutal self-expression through streetwear. Shop premium oversized hoodies and tees.",
    siteName: "Zorodoor",
    images: [{
      url: "/og-image.jpg", // We need to make sure this exists or user adds it
      width: 1200,
      height: 630,
      alt: "Zorodoor Streetwear Collection",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zorodoor - Premium Anime Streetwear",
    description: "Brutal self-expression through streetwear. Shop premium oversized hoodies and tees.",
    creator: "@zorodoor",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://zorodoor.com/#organization",
                  "name": "Zorodoor",
                  "url": "https://zorodoor.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://zorodoor.com/logo.png"
                  },
                  "founder": {
                    "@type": "Person",
                    "name": "Nitin Sharma",
                    "url": "https://www.linkedin.com/in/nitin-sharma-503645290/",
                    "image": "https://zorodoor.com/nitin.jpg",
                    "sameAs": [
                      "https://www.linkedin.com/in/nitin-sharma-503645290/",
                      "https://www.instagram.com/nitin__.sharma_/"
                    ]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://zorodoor.com/#website",
                  "url": "https://zorodoor.com",
                  "name": "Zorodoor",
                  "publisher": {
                    "@id": "https://zorodoor.com/#organization"
                  }
                }
              ]
            }),
          }}
        />
      </body>
    </html>
  );
}

