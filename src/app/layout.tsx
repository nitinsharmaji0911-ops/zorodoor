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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zorodoor.store'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ZORODOOR | Original Indian Streetwear by Nitin Sharma",
    template: "%s | ZORODOOR",
  },
  description:
    "Official store of ZORODOOR — India's boldest anime streetwear brand. Premium 280gsm oversized graphic T-shirts. Founded by Nitin Sharma. Free shipping above ₹999. COD available.",
  keywords: [
    "ZORODOOR",
    "Zorodoor",
    "Indian streetwear",
    "anime streetwear India",
    "oversized graphic tshirts India",
    "anime tshirts",
    "Nitin Sharma streetwear",
    "Nitin Sharma clothing brand",
    "Indian clothing brand",
    "280gsm oversized tshirt",
    "goku tshirt India",
    "berserk tshirt India",
    "samurai tshirt",
    "anime fashion India",
    "streetwear brand India",
    "premium oversized tshirt",
  ],
  authors: [
    { name: "Nitin Sharma", url: "https://zorodoor.store/about" },
  ],
  creator: "Nitin Sharma",
  publisher: "ZORODOOR",
  category: "Fashion & Clothing",
  openGraph: {
    title: "ZORODOOR | Original Indian Streetwear by Nitin Sharma",
    description:
      "Premium oversized graphic T-shirts. Made in India for those who dare to be different. 280gsm heavyweight cotton. Free shipping above ₹999.",
    url: BASE_URL,
    siteName: "ZORODOOR",
    images: [
      {
        url: "/products/anime_tee_eyes.png",
        width: 1200,
        height: 630,
        alt: "ZORODOOR — Wake Up To Reality Oversized Tee by Nitin Sharma",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZORODOOR | Original Indian Streetwear",
    description:
      "Premium 280gsm oversized anime graphic T-shirts. Founded by Nitin Sharma. Made in India.",
    site: "@zorodoor",
    creator: "@nitinsharma",
    images: ["/products/anime_tee_eyes.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "ZORODOOR",
  alternateName: "Zorodoor Store",
  url: "https://zorodoor.store",
  logo: "https://zorodoor.store/favicon.svg",
  description:
    "India's boldest anime streetwear clothing brand. Premium 280gsm oversized graphic T-shirts. Founded by Nitin Sharma.",
  founder: {
    "@type": "Person",
    name: "Nitin Sharma",
    url: "https://zorodoor.store/about",
    jobTitle: "Founder & Creative Director",
    nationality: "Indian",
    sameAs: [
      "https://www.instagram.com/zorodoor/",
      "https://x.com/zorodoor",
    ],
  },
  foundingDate: "2025",
  foundingLocation: {
    "@type": "Place",
    name: "India",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.instagram.com/zorodoor/",
    "https://x.com/zorodoor",
    "http://youtube.com/@zorodoor",
    "https://github.com/nitinsharmaji0911-ops/zorodoor",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Zorodoor Streetwear Collection",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Oversized Graphic T-Shirts",
      },
      {
        "@type": "OfferCatalog",
        name: "Anime T-Shirts",
      },
      {
        "@type": "OfferCatalog",
        name: "Sweatshirts",
      },
    ],
  },
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: ["Cash", "Credit Card", "UPI", "Net Banking"],
  areaServed: "India",
  shippingDetails: {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: "0",
      currency: "INR",
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "IN",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      businessDays: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
      cutoffTime: "17:00",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 2,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 3,
        maxValue: 7,
        unitCode: "DAY",
      },
    },
  },
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nitin Sharma",
  jobTitle: "Founder & Creative Director",
  description:
    "Nitin Sharma is the founder and creative director of ZORODOOR, India's boldest anime streetwear brand. Nitin built Zorodoor to give Indian streetwear a brutal, authentic identity rooted in anime culture and bold graphic design.",
  url: "https://zorodoor.store/about",
  nationality: "Indian",
  brand: {
    "@type": "Brand",
    name: "ZORODOOR",
    url: "https://zorodoor.store",
  },
  sameAs: [
    "https://www.instagram.com/zorodoor/",
    "https://github.com/nitinsharmaji0911-ops",
  ],
  worksFor: {
    "@type": "Organization",
    name: "ZORODOOR",
    url: "https://zorodoor.store",
  },
  knowsAbout: [
    "Streetwear Fashion",
    "Anime Culture",
    "Graphic Design",
    "Indian Fashion",
    "E-commerce",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZORODOOR",
  url: "https://zorodoor.store",
  description: "India's boldest anime streetwear brand. Founded by Nitin Sharma.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://zorodoor.store/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  author: {
    "@type": "Person",
    name: "Nitin Sharma",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Canonical + DNS preconnects */}
        <link rel="preconnect" href="https://hdpvyizvdrquhndznygr.supabase.co" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hdpvyizvdrquhndznygr.supabase.co" />

        {/* Structured Data — Organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Structured Data — Founder: Nitin Sharma */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* Structured Data — Website searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
