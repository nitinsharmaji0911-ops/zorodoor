import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://zorodoor.com'

    // Standard routes
    const routes = [
        '',
        '/shop',
        '/about',
        '/contact',
        '/terms',
        '/privacy',
        '/shipping',
        '/faq',
        '/size-guide',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return [...routes]
}
