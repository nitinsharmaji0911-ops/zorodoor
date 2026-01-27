import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Helper to fix the connection string on Vercel if it's incorrect
const getConnectionString = () => {
    // Prefer DIRECT_URL if available, otherwise DATABASE_URL
    let urlStr = process.env.DIRECT_URL || process.env.DATABASE_URL;

    if (!urlStr) return undefined;

    try {
        // FIX: Detect if we are trying to connect to Direct Host on Pooler Port (6543)
        if (urlStr.includes('db.ibnydzahapvnmbtgoxha.supabase.co:6543')) {
            console.warn('⚠️ Detected broken connection string. Aggressively fixing for Supabase Pooler...');

            // We know the password is correct in the env var, but the rest is messed up.
            // So we extract the password and construct the known-good URL.
            const urlObj = new URL(urlStr.replace('db.ibnydzahapvnmbtgoxha.supabase.co:6543', 'example.com')); // Dummy host to parse
            const password = urlObj.password;

            // Construct the exact URL that worked in local .env
            return `postgresql://postgres.ibnydzahapvnmbtgoxha:${password}@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`;
        }
    } catch (e) {
        console.error('Failed to fix connection string:', e);
    }

    return urlStr;
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
