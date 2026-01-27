import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Helper to fix the connection string on Vercel if it's incorrect
const getConnectionString = () => {
    // Prefer DIRECT_URL if available, otherwise DATABASE_URL
    let urlStr = process.env.DIRECT_URL || process.env.DATABASE_URL;

    if (!urlStr) return undefined;

    try {
        // FIX: Detect if we are trying to connect to Direct Host on Pooler Port (6543)
        // If pooler fails, fall back to DIRECT connection on port 5432
        if (urlStr.includes('db.ibnydzahapvnmbtgoxha.supabase.co:6543')) {
            console.warn('⚠️ Detected broken connection string. Falling back to DIRECT connection (Port 5432)...');

            // Replace port 6543 with 5432
            let fixedUrl = urlStr.replace(':6543', ':5432');

            // Remove pgbouncer param if present
            fixedUrl = fixedUrl.replace('?pgbouncer=true', '');
            fixedUrl = fixedUrl.replace('&pgbouncer=true', '');

            // Ensure username is 'postgres' (it likely is, but if it was modified, reset it)
            // Actually, if we use the Vercel provided URL, it has 'postgres' as user (seen in debug), so valid for Direct.

            return fixedUrl;
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
