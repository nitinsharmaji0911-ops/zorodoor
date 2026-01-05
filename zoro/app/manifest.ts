import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Zorodoor Streetwear',
        short_name: 'Zorodoor',
        description: 'Brutal Self-Expression Through Streetwear',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f0f0f',
        theme_color: '#00D1FF',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
