import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    try {
        const dataPath = path.join(process.cwd(), 'data', 'products.json')
        const fileContents = fs.readFileSync(dataPath, 'utf8')
        const data = JSON.parse(fileContents)

        console.log(`Seeding ${data.products.length} products...`)

        for (const product of data.products) {
            await prisma.product.upsert({
                where: { slug: product.slug },
                update: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    images: product.images,
                    category: product.category,
                    sizes: product.sizes,
                    features: product.features,
                    rating: product.rating,
                    reviewCount: product.reviewCount,
                    inStock: product.inStock,
                    stock: 50, // Default stock for seeding
                    featured: product.featured,
                    newArrival: product.newArrival,
                    gender: product.gender || 'Unisex',
                    collections: product.collections || [],
                },
                create: {
                    name: product.name,
                    slug: product.slug,
                    description: product.description,
                    price: product.price,
                    images: product.images,
                    category: product.category,
                    sizes: product.sizes,
                    features: product.features,
                    rating: product.rating,
                    reviewCount: product.reviewCount,
                    inStock: product.inStock,
                    stock: 50, // Default stock for seeding
                    featured: product.featured,
                    newArrival: product.newArrival,
                    gender: product.gender || 'Unisex',
                    collections: product.collections || [],
                },
            })
        }
        console.log('Seed data inserted successfully')
    } catch (error) {
        console.error('Error seeding data:', error)
        process.exit(1)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
