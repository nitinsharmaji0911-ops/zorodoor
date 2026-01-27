import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Helper to fix the connection string on Vercel if it's incorrect
const getConnectionString = () => {
    // Prefer DIRECT_URL if available, otherwise DATABASE_URL
    let url = process.env.DIRECT_URL || process.env.DATABASE_URL;

    if (!url) return undefined;

    // FIX: Detect if we are trying to connect to Direct Host on Pooler Port (6543)
    // This happens if Vercel env vars are set incorrectly.
    if (url.includes('db.ibnydzahapvnmbtgoxha.supabase.co:6543')) {
        console.warn('⚠️ Detected broken connection string (Direct Host + Pooler Port). Applying runtime fix...');
        // Replace with the correct Pooler Host
        return url.replace(
            'db.ibnydzahapvnmbtgoxha.supabase.co:6543',
            'aws-1-ap-south-1.pooler.supabase.com:6543'
        );
    }

    return url;
};

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
        datasources: {
            db: {
                url: getConnectionString(),
            },
        },
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
