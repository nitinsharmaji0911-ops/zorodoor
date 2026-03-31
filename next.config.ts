import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ── Image optimisation ────────────────────────────────────────────────
  images: {
    // Serve WebP/AVIF automatically — Next.js handles conversion at runtime
    formats: ["image/avif", "image/webp"],
    // Next.js 16: must explicitly list all quality values used in <Image quality={n}>
    qualities: [75, 80, 85],
    // Cache optimised images for up to 1 year
    minimumCacheTTL: 31536000,
    // Serve device-appropriate sizes
    deviceSizes: [390, 640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256],
  },

  // ── HTTP headers ──────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Cache all static assets (images, fonts, js, css) for 1 year
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|woff|woff2|ttf|js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=86400, immutable",
          },
        ],
      },
      {
        // HTML pages — short cache, always revalidate
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },

  // ── Compiler ──────────────────────────────────────────────────────────
  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ── Experimental ─────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
