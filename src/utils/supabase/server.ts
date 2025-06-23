import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';

// Create a mock client object with the minimal interface needed
const createMockClient = () => {
  const mockClient = {
    from: () => ({
      select: () => ({ data: null, error: new Error('Supabase client not initialized') }),
      insert: () => ({ data: null, error: new Error('Supabase client not initialized') }),
      update: () => ({ data: null, error: new Error('Supabase client not initialized') }),
      delete: () => ({ data: null, error: new Error('Supabase client not initialized') }),
      match: () => ({ data: null, error: new Error('Supabase client not initialized') }),
    }),
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
    },
    storage: { 
      from: () => ({
        upload: async () => ({ error: new Error('Supabase client not initialized') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  };
  return mockClient as unknown as SupabaseClient;
};

// Use a try-catch approach that will never fail during build
export async function createClient(): Promise<SupabaseClient> {
  try {
    // Check for SERVER-SIDE environment variables first
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    
    // Return mock client early if no env vars are found
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase server-side URL or Anon Key not available. Using mock client.');
      return createMockClient();
    }
    
    // Now try to get cookies - this might throw an error during static generation
    let cookieStore;
    try {
      cookieStore = await cookies();
    } catch (_) {
      console.warn('Could not access cookies, likely in static generation. Using mock client.');
      return createMockClient();
    }

    // If we have env vars and cookies, create the real client
    return createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch (_) {
              // The `set` method was called from a Server Component or during static generation
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options });
            } catch (_) {
              // The `delete` method was called from a Server Component or during static generation
            }
          },
        },
      }
    );
  } catch (error) {
    console.error('An unexpected error occurred while creating Supabase client:', error);
    return createMockClient();
  }
}
