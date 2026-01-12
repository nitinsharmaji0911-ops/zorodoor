const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DIRECT_URL || process.env.DATABASE_URL,
        },
    },
});

async function main() {
    console.log("🔄 Converting product prices to INR...\n");

    // Realistic Indian streetwear pricing
    const priceMap: Record<string, number> = {
        "Hoodies": 2999,
        "T-Shirts": 1499,
        "Lower": 1999,
        "Collectibles": 999,
    };

    const products = await prisma.product.findMany();

    for (const product of products) {
        const newPrice = priceMap[product.category] || Math.round(product.price * 83);

        await prisma.product.update({
            where: { id: product.id },
            data: { price: newPrice }
        });

        console.log(`✅ ${product.name}: $${product.price} → ₹${newPrice}`);
    }

    console.log("\n✨ All prices updated to INR!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
