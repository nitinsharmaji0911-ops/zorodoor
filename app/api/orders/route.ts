import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";

// GET /api/orders - Fetch orders for authenticated user
export async function GET(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                items: {
                    include: {
                        product: true // Include product details
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Format orders for frontend if needed
        const formattedOrders = orders.map(order => ({
            id: order.id,
            date: order.createdAt,
            status: order.status,
            total: order.total,
            items: order.items.map(item => ({
                name: item.product.name,
                image: item.product.images[0],
                quantity: item.quantity,
                price: item.price
            }))
        }));

        return NextResponse.json(formattedOrders);

    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
