import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { prisma } from '@/lib/prisma'; // Still needed for POST/DELETE admin operations
import { auth } from '@/auth';

// GET /api/products - Fetch all products with filtering
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const gender = searchParams.get('gender');
        const collection = searchParams.get('collection');
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const newArrival = searchParams.get('newArrival');

        // Read products from JSON file
        const filePath = join(process.cwd(), 'data', 'products.json');
        const fileContent = readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        let products = data.products;

        // Apply filters
        if (gender) {
            products = products.filter((p: any) => p.gender === gender);
        }

        if (collection) {
            products = products.filter((p: any) => 
                p.collections && p.collections.includes(collection)
            );
        }

        if (category) {
            products = products.filter((p: any) => p.category === category);
        }

        if (featured) {
            const isFeatured = featured === 'true';
            products = products.filter((p: any) => p.featured === isFeatured);
        }

        if (newArrival) {
            const isNewArrival = newArrival === 'true';
            products = products.filter((p: any) => p.newArrival === isNewArrival);
        }

        return NextResponse.json(products);
    } catch (error: any) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to load products' },
            { status: 500 }
        );
    }
}

// POST /api/products - Create a new product (Admin only)
export async function POST(request: Request) {
    try {
        // Check authentication
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Create new product
        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                slug:
                    body.slug ||
                    body.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, ''),
                description: body.description || '',
                price: parseFloat(body.price),
                images: body.images || [],
                category: body.category,
                sizes: body.sizes || [],
                features: body.features || [],
                rating: 0,
                reviewCount: 0,
                inStock: body.inStock !== undefined ? body.inStock : true,
                stock: body.stock || 0,
                featured: body.featured || false,
                newArrival: true,
                gender: body.gender || 'Unisex',
                collections: body.collections || [],
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to add product' },
            { status: 500 }
        );
    }
}

// DELETE /api/products?id=<id> - Delete a product (Admin only)
export async function DELETE(request: Request) {
    try {
        // Check authentication
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        // Delete the product
        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting product:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
