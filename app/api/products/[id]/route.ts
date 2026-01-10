import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

interface Product {
    id: string;
    [key: string]: any;
}

interface ProductData {
    products: Product[];
}

function getProducts(): ProductData {
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(jsonData);
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = getProducts();

        // Find product by exact ID match
        const product = data.products.find((p) => p.id === id);

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
