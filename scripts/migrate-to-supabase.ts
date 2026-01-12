import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Starting migration from JSON to Supabase...');

        // Read products from JSON file
        const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
        const jsonData = fs.readFileSync(productsFilePath, 'utf-8');
        const { products } = JSON.parse(jsonData);

        console.log(`Found ${products.length} products to migrate`);

        // Clear existing products (optional - be careful with this in production)
        console.log('Clearing existing products...');
        await prisma.product.deleteMany({});

        // Migrate each product
        let successCount = 0;
        for (const product of products) {
            try {
                await prisma.product.create({
                    data: {
                        id: product.id || undefined, // Use existing ID or let Prisma generate new one
                        name: product.name,
                        slug: product.slug,
                        description: product.description || '',
                        price: parseFloat(product.price),
                        images: product.images || [],
                        category: product.category,
                        sizes: product.sizes || [],
                        features: product.features || [],
                        rating: product.rating || 0,
                        reviewCount: product.reviewCount || 0,
                        inStock: product.inStock !== undefined ? product.inStock : true,
                        stock: product.stock || 0,
                        featured: product.featured || false,
                        newArrival: product.newArrival || false,
                    },
                });
                successCount++;
                console.log(`✓ Migrated: ${product.name}`);
            } catch (error: any) {
                console.error(`✗ Failed to migrate ${product.name}:`, error.message);
            }
        }

        console.log(`\n✅ Migration complete! ${successCount}/${products.length} products migrated successfully.`);

        // Verify migration
        const count = await prisma.product.count();
        console.log(`Total products in database: ${count}`);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
