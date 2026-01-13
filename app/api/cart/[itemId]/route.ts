import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// PATCH /api/cart/[itemId] - Update cart item quantity
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ itemId: string }> }
) {
    try {
        const session = await auth();

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { itemId } = await params;
        const body = await req.json();
        const { quantity } = body;

        if (quantity === undefined || quantity < 0) {
            return NextResponse.json(
                { error: 'Invalid quantity' },
                { status: 400 }
            );
        }

        // Verify item belongs to user's cart
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: itemId },
            include: {
                cart: true,
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
        }

        if (cartItem.cart.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // If quantity is 0, delete the item
        if (quantity === 0) {
            await prisma.cartItem.delete({
                where: { id: itemId },
            });
        } else {
            // Update quantity
            await prisma.cartItem.update({
                where: { id: itemId },
                data: { quantity: Math.min(quantity, 10) }, // Max 10 items
            });
        }

        // Fetch updated cart
        const updatedCart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        const formattedItems = updatedCart!.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.product.images[0] || '/placeholder-product.png',
        }));

        return NextResponse.json({
            items: formattedItems,
            total: formattedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE /api/cart/[itemId] - Remove specific item from cart
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ itemId: string }> }
) {
    try {
        const session = await auth();

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { itemId } = await params;

        // Verify item belongs to user's cart
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: itemId },
            include: {
                cart: true,
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
        }

        if (cartItem.cart.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Delete the item
        await prisma.cartItem.delete({
            where: { id: itemId },
        });

        return NextResponse.json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
