import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET /api/wishlist - Fetch authenticated user's wishlist
export async function GET() {
    try {
        const session = await auth();

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch or create wishlist for user
        let wishlist = await prisma.wishlist.findUnique({
            where: { userId: session.user.id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!wishlist) {
            // Create empty wishlist if doesn't exist
            wishlist = await prisma.wishlist.create({
                data: {
                    userId: session.user.id,
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        }

        // Format response
        const formattedItems = wishlist.items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images[0] || '/placeholder-product.png',
        }));

        return NextResponse.json(formattedItems);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/wishlist - Add product to wishlist
export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { productId } = body;

        if (!productId) {
            return NextResponse.json(
                { error: 'Missing required field: productId' },
                { status: 400 }
            );
        }

        // Verify product exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Get or create wishlist
        let wishlist = await prisma.wishlist.findUnique({
            where: { userId: session.user.id },
        });

        if (!wishlist) {
            wishlist = await prisma.wishlist.create({
                data: { userId: session.user.id },
            });
        }

        // Check if item already exists in wishlist
        const existingItem = await prisma.wishlistItem.findFirst({
            where: {
                wishlistId: wishlist.id,
                productId,
            },
        });

        if (existingItem) {
            return NextResponse.json(
                { message: 'Product already in wishlist' },
                { status: 200 }
            );
        }

        // Add to wishlist
        await prisma.wishlistItem.create({
            data: {
                wishlistId: wishlist.id,
                productId,
            },
        });

        // Fetch updated wishlist
        const updatedWishlist = await prisma.wishlist.findUnique({
            where: { userId: session.user.id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        const formattedItems = updatedWishlist!.items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images[0] || '/placeholder-product.png',
        }));

        return NextResponse.json(formattedItems);
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE /api/wishlist - Clear entire wishlist
export async function DELETE() {
    try {
        const session = await auth();

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const wishlist = await prisma.wishlist.findUnique({
            where: { userId: session.user.id },
        });

        if (wishlist) {
            // Delete all items in wishlist
            await prisma.wishlistItem.deleteMany({
                where: { wishlistId: wishlist.id },
            });
        }

        return NextResponse.json({ success: true, message: 'Wishlist cleared' });
    } catch (error) {
        console.error('Error clearing wishlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
