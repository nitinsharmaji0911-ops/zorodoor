import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
// import { prisma } from '@/lib/prisma';

// GET /api/products/[id] - Fetch a single product by ID
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Read products from JSON file
        const filePath = join(process.cwd(), 'data', 'products.json');
        const fileContent = readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        // Find product by ID
        const product = data.products.find((p: any) => p.id === id);

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
