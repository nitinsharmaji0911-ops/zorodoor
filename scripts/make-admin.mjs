import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeAdmin() {
    try {
        const user = await prisma.user.update({
            where: {
                email: 'nitin.sharmaji0512@gmail.com'
            },
            data: {
                role: 'ADMIN'
            }
        });

        console.log('✅ Success! User is now an ADMIN:');
        console.log('Email:', user.email);
        console.log('Name:', user.name);
        console.log('Role:', user.role);
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

makeAdmin();
