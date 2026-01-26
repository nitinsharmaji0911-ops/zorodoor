// Check if admin user exists
import { prisma } from '../lib/prisma';

async function checkAdminUser() {
    try {
        console.log('Checking for admin users...\n');

        // Get all users
        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            }
        });

        console.log(`Total users in database: ${allUsers.length}\n`);

        if (allUsers.length > 0) {
            console.log('All users:');
            allUsers.forEach(user => {
                console.log(`  - ${user.email} (${user.role})`);
            });
        }

        // Check for admin users specifically
        const adminUsers = allUsers.filter(u => u.role === 'ADMIN');

        console.log(`\n📊 Admin users: ${adminUsers.length}`);

        if (adminUsers.length === 0) {
            console.log('\n⚠️  No admin users found!');
            console.log('Run: npx tsx scripts/create-admin.ts');
        } else {
            console.log('\n✅ Admin users found:');
            adminUsers.forEach(admin => {
                console.log(`  Email: ${admin.email}`);
                console.log(`  Name: ${admin.name}`);
                console.log(`  Role: ${admin.role}\n`);
            });
        }

    } catch (error) {
        console.error('Error checking users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkAdminUser();
