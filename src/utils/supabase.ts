import { createBrowserClient as _createBrowserClient } from '@supabase/ssr'

// Check for server-side environment variables
const isServer = typeof window === 'undefined'
const supabaseUrl = isServer 
  ? process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  : process.env.NEXT_PUBLIC_SUPABASE_URL

const supabaseAnonKey = isServer
  ? process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Original function, kept for backward compatibility
export function createSupabaseClient() {
  return _createBrowserClient(
    supabaseUrl!,
    supabaseAnonKey!
  )
}

// New function with consistent naming
export function createBrowserClient() {
  return _createBrowserClient(
    supabaseUrl!,
    supabaseAnonKey!
  )
}
