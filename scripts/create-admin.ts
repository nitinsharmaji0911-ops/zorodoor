// Run this script to create an admin user
// Command: npx tsx scripts/create-admin.ts

import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function createAdmin() {
    const email = 'admin@zorodoor.com';
    const password = 'admin123'; // Change this to a secure password
    const name = 'Admin User';

    try {
        // Check if admin already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log('Admin user already exists!');
            console.log('Email:', email);
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'ADMIN'
            }
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', admin.role);
        console.log('\n⚠️  Please change this password after first login!');
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
