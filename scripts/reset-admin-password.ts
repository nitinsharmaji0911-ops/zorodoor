// Reset admin password to a known value
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function resetAdminPassword() {
    const email = 'nitin.sharmaji0512@gmail.com';
    const newPassword = 'admin123';

    try {
        // Check if admin exists
        const admin = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                role: true,
            }
        });

        if (!admin) {
            console.log('❌ Admin user not found!');
            return;
        }

        console.log('Found admin user:');
        console.log(`  Email: ${admin.email}`);
        console.log(`  Role: ${admin.role}\n`);

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        console.log('✅ Admin password reset successfully!');
        console.log(`  Email: ${email}`);
        console.log(`  New Password: ${newPassword}`);
        console.log('\n⚠️  Use these credentials to log in to the admin panel.');

    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetAdminPassword();
