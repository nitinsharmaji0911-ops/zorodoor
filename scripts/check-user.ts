const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const email = "nitin.sharmaji0512@gmail.com";
    console.log(`Checking for user: ${email} `);
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, firstName: true } // Don't fetch password
    });

    if (user) {
        console.log("User found:", user);
    } else {
        console.log("User NOT found");
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
