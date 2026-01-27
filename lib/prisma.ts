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
            console.warn('⚠️ Detected broken connection string. Applying runtime fix (Host + User)...');

            // Replace Host
            const fixedUrl = urlStr.replace(
                'db.ibnydzahapvnmbtgoxha.supabase.co:6543',
                'aws-1-ap-south-1.pooler.supabase.com:6543'
            );

            // Parse URL to check/fix username
            // We use 'postgresql://' so URL() works
            const urlObj = new URL(fixedUrl);

            const projectRef = 'ibnydzahapvnmbtgoxha';

            // If username is just 'postgres', append the project ref
            if (urlObj.username === 'postgres') {
                urlObj.username = `postgres.${projectRef}`;
                console.warn('⚠️ Also fixed username for Pooler compatibility.');
            }

            return urlObj.toString();
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
