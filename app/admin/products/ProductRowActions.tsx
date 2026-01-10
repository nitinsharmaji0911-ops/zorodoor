"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/app/actions/admin";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function ProductRowActions({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    const { showToast } = useToast();

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this product?")) {
            startTransition(async () => {
                await deleteProduct(id);
                showToast("Product deleted", "success");
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-500 hover:text-red-700 disabled:opacity-50 p-2"
        >
            <Trash2 size={18} />
        </button>
    );
}
