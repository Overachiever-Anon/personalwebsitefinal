import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';

// Create a mock client object that can be used when the real client can't be created
// This prevents build-time errors without relying on environment variables during static generation
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

// Function to check if we're in a build/static generation environment
const isStaticGeneration = () => {
  return process.env.NEXT_PHASE === 'phase-production-build' || 
         process.env.NEXT_PHASE === 'phase-export';
};

// Only create a real client if we're not in static generation
export async function createClient(): Promise<SupabaseClient> {
  // If we're in static generation, always return the mock client
  if (isStaticGeneration()) {
    console.warn('Static generation detected. Using mock Supabase client.');
    return mockClient as unknown as SupabaseClient;
  }
  
  try {
    const cookieStore = await cookies();
    
    // Check if environment variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase URL or Anon Key not available. Using mock client.');
      return mockClient as unknown as SupabaseClient;
    }

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
            } catch {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options });
            } catch {
              // The `delete` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    return mockClient as unknown as SupabaseClient;
  }
};
