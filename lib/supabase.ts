import { createClient } from '@supabase/supabase-js';

// Get environment variables (make them optional to avoid build errors)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client for frontend use (will fail gracefully if not configured)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
});

// Helper function to verify connection
export async function testSupabaseConnection() {
    try {
        if (!supabaseUrl || !supabaseAnonKey) {
            return { success: false, message: 'Supabase environment variables not configured' };
        }
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
    hasKey: !!supabaseAnonKey,
};

