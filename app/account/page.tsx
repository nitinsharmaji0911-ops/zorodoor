import React from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import AccountClient from "./AccountClient";
import { redirect } from "next/navigation";

export default async function AccountPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            items: true
        }
    });

    return (
        <AccountClient userSession={session} orders={orders} />
    );
}
