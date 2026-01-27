import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
    try {
        const products = await prisma.product.findMany();

        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Database Products Debug</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Slug</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td className="border p-2 font-mono text-xs">{p.id}</td>
                                    <td className="border p-2 font-mono text-xs">{p.slug}</td>
                                    <td className="border p-2">{p.name}</td>
                                    <td className="border p-2">{p.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <pre className="mt-8 bg-gray-100 p-4 rounded overflow-auto h-96">
                    {JSON.stringify(products, null, 2)}
                </pre>
            </div>
        );
    } catch (error: any) {
        return (
            <div className="p-8 text-red-500">
                <h1 className="text-2xl font-bold">Error Accessing Database</h1>
                <pre>{error.message}</pre>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }
}
