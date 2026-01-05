import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

interface Product {
    id: string;
    name: string;
    slug: string;
    category: string;
    price: number;
    images: string[];
    sizes?: string[]; // Optional as newly added products might not have it strictly defined yet or defaulted
    rating?: number;
    reviewCount?: number;
    description?: string;
    features?: string[];
    inStock?: boolean;
    featured?: boolean;
    newArrival?: boolean;
    [key: string]: any; // Allow flexibility for now
}

interface ProductData {
    products: Product[];
}

// Helper to read data
function getProducts(): ProductData {
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(jsonData);
}

// Helper to write data
function saveProducts(data: ProductData) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
    try {
        const data = getProducts();
        return NextResponse.json(data.products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = getProducts();

        const newProduct = {
            id: Date.now().toString(), // Simple ID generation
            slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), // Generate slug
            ...body,
            rating: 0,
            reviewCount: 0,
            inStock: true,
            newArrival: true
        };

        data.products.push(newProduct);
        saveProducts(data);

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const data = getProducts();
        const initialLength = data.products.length;
        data.products = data.products.filter((p: Product) => p.id !== id);

        if (data.products.length === initialLength) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        saveProducts(data);
        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
