"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Helper to check admin role
async function checkAdmin() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
}

export async function createProduct(formData: FormData) {
    await checkAdmin();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const stock = parseInt(formData.get("stock") as string);
    const imagesStr = formData.get("images") as string; // Expecting comma-separated URLs or JSON
    const sizesStr = formData.get("sizes") as string; // Expecting comma-separated

    // Simple parsing logic
    const images = imagesStr.includes("[") ? JSON.parse(imagesStr) : imagesStr.split(",").map(s => s.trim()).filter(Boolean);
    const sizes = sizesStr.includes("[") ? JSON.parse(sizesStr) : sizesStr.split(",").map(s => s.trim()).filter(Boolean);
    const features = ["Premium Quality", "Authentic Design"]; // Default features for simplicity

    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now();

    try {
        await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price,
                stock,
                category,
                images: images,
                sizes: sizes,
                features: features,
                rating: 5,
                reviewCount: 0,
                inStock: stock > 0
            }
        });
    } catch (e) {
        console.error("Failed to create product", e);
        return { error: "Failed to create product" };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    await checkAdmin();

    try {
        await prisma.product.delete({
            where: { id }
        });
    } catch (e) {
        console.error("Failed to delete product", e);
        return { error: "Failed to delete product" };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
}
