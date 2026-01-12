import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are defined
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client for frontend use
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
});

// Helper function to verify connection
export async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase.from('Product').select('count');
        if (error) throw error;
        return { success: true, message: 'Supabase connection successful!' };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

// Export configuration (for debugging)
export const supabaseConfig = {
    url: supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
};
