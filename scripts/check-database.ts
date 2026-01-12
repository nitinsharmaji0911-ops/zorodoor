import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
    try {
        console.log('Connecting to database...');

        // Count products
        const count = await prisma.product.count();
        console.log(`\n✅ Database connection successful!`);
        console.log(`📊 Total products in database: ${count}`);

        if (count === 0) {
            console.log('\n⚠️  Database is EMPTY - no products found!');
            console.log('Need to run migration to upload products.');
        } else {
            // Show first few products
            const products = await prisma.product.findMany({ take: 5 });
            console.log('\nFirst few products:');
            products.forEach(p => console.log(`  - ${p.name} ($${p.price})`));
        }
    } catch (error: any) {
        console.error('\n❌ Database connection failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabase();
