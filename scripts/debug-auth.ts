
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("--- DEBUG START ---");

    // 1. Check Env Vars
    console.log("Checking Environment Variables:");
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("AUTH_SECRET exists:", !!process.env.AUTH_SECRET);
    console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);

    // 2. Check DB Connection & User
    const email = "nitin.sharmaji0512@gmail.com";
    console.log(`Checking for user: ${email} in DB...`);

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, password: true }
        });

        if (user) {
            console.log("User FOUND in DB.");
            console.log("Has Password:", !!user.password);
        } else {
            console.log("User NOT FOUND in DB.");
        }
    } catch (e: any) {
        console.error("DB Connection FAILED:", e.message);
    }

    console.log("--- DEBUG END ---");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
        process.exit(0);
    });
