import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createStorageBucket() {
    try {
        console.log('Creating Supabase Storage bucket...');

        // Create the products bucket
        const { data, error } = await supabase.storage.createBucket('products', {
            public: true,
            fileSizeLimit: 52428800, // 50MB
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
        });

        if (error) {
            if (error.message.includes('already exists')) {
                console.log('✓ Bucket "products" already exists');
                return;
            }
            throw error;
        }

        console.log('✅ Bucket "products" created successfully!');
        console.log('Bucket details:', data);
    } catch (error: any) {
        console.error('❌ Error creating bucket:', error.message);
        process.exit(1);
    }
}

createStorageBucket();
