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
    // Check for environment variables first before any other operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Return mock client early if no env vars
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase URL or Anon Key not available. Using mock client.');
      return createMockClient();
    }
    
    // Now try to get cookies - this might throw during static generation
    let cookieStore;
    try {
      cookieStore = await cookies();
    } catch (_) {
      console.warn('Could not access cookies, likely in static generation. Using mock client.');
      return createMockClient();
    }

    // Now safely create the client with all dependencies available
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
    console.error('Error creating Supabase client:', error);
    return createMockClient();
  }
};

