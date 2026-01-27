import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
    const dbUrl = process.env.DATABASE_URL || "";
    const directUrl = process.env.DIRECT_URL || "";

    // Mask password
    const mask = (url: string) => url.replace(/:([^:@]+)@/, ":****@");

    let products: Product[] = [];
    let errorMsg = null;

    try {
        products = await prisma.product.findMany();
    } catch (e: any) {
        errorMsg = e.message;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Database Products Debug</h1>

            <div className="mb-8 p-4 bg-yellow-100 rounded">
                <h2 className="font-bold">Environment Variables (Masked)</h2>
                <p><strong>DATABASE_URL:</strong> {mask(dbUrl)}</p>
                <p><strong>DIRECT_URL:</strong> {mask(directUrl)}</p>
            </div>

            {errorMsg && (
                <div className="mb-8 p-4 bg-red-100 rounded text-red-700">
                    <h2 className="font-bold">Error</h2>
                    <pre>{errorMsg}</pre>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Slug</th>
                            <th className="border p-2">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td className="border p-2 font-mono text-xs">{p.id}</td>
                                <td className="border p-2 font-mono text-xs">{p.slug}</td>
                                <td className="border p-2">{p.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
