import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// DELETE /api/wishlist/[productId] - Remove specific product from wishlist
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ productId: string }> }
) {
    try {
        const session = await auth();

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { productId } = await params;

        // Get user's wishlist
        const wishlist = await prisma.wishlist.findUnique({
            where: { userId: session.user.id },
        });

        if (!wishlist) {
            return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
        }

        // Find and delete the wishlist item
        const wishlistItem = await prisma.wishlistItem.findFirst({
            where: {
                wishlistId: wishlist.id,
                productId,
            },
        });

        if (!wishlistItem) {
            return NextResponse.json(
                { error: 'Product not in wishlist' },
                { status: 404 }
            );
        }

        await prisma.wishlistItem.delete({
            where: { id: wishlistItem.id },
        });

        return NextResponse.json({ success: true, message: 'Product removed from wishlist' });
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
