import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id] - Fetch a single product by ID
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Try to find product by ID first
        let product = await prisma.product.findUnique({
            where: { id }
        });

        // If not found by ID, try finding by slug
        if (!product) {
            product = await prisma.product.findUnique({
                where: { slug: id } // We use 'id' param as potential slug
            });
        }

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error: any) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
