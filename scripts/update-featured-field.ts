import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateProductsWithFeatured() {
    try {
        console.log('Updating products with featured field...');

        // Update all products without a featured value
        const result = await prisma.product.updateMany({
            data: {
                featured: true,
            },
        });

        console.log(`✅ Updated ${result.count} products with featured field`);

        // Verify
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                featured: true,
            },
        });

        console.log('\nProduct featured status:');
        products.forEach((p) => {
            console.log(`- ${p.name}: featured=${p.featured}`);
        });

        console.log('\n✅ Database update complete!');
    } catch (error: any) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

updateProductsWithFeatured();
