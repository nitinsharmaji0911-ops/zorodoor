import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/account/', '/api/', '/auth/'],
      },
    ],
    sitemap: 'https://zorodoor.store/sitemap.xml',
    host: 'https://zorodoor.store',
  }
}
