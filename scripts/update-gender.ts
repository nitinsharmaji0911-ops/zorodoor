
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Updating product genders...");

    // Update specific products to Men
    await prisma.product.updateMany({
        where: {
            name: { in: ["Berserk Oversized T-Shirt", "BlueLoc Oversized Hoodie", "Zero Fucks Oversized Tee", "Priest 'Age' Graphic Hoodie"] }
        },
        data: { gender: "Men" }
    });

    // Update specific products to Women (Madamji)
    await prisma.product.updateMany({
        where: {
            name: { in: ["Demon Slayer Hoodie", "Just Chilling Palm Tee"] }
        },
        data: { gender: "Women" }
    });

    // Tag one as "His Hoodie" collection for the feature
    await prisma.product.updateMany({
        where: {
            name: "Demon Slayer Hoodie"
        },
        data: {
            collections: ["HisHoodie"]
        }
    });

    console.log("✅ Product genders updated!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
