
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DIRECT_URL,
        },
    },
});

async function main() {
    const email = "nitin.sharmaji0512@gmail.com";
    const password = "password123";
    const name = "Nitin Sharma";

    console.log(`Ensuring user exists: ${email}`);

    const existing = await prisma.user.findUnique({
        where: { email }
    });

    if (existing) {
        console.log("User already exists. Updating password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                role: "ADMIN" // Grant admin while we are at it
            }
        });
        console.log("User updated. Password is: password123");
    } else {
        console.log("Creating new user...");
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: "ADMIN"
            }
        });
        console.log("User created. Password is: password123");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
