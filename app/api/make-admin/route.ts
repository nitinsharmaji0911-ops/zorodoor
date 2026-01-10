import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Update the specific user to admin
        const user = await prisma.user.update({
            where: {
                email: 'nitin.sharmaji0512@gmail.com'
            },
            data: {
                role: 'ADMIN'
            }
        });

        return NextResponse.json({
            success: true,
            message: 'User is now an ADMIN!',
            email: user.email,
            role: user.role
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
