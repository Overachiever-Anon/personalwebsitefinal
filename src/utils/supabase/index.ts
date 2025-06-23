// src/utils/supabase/index.ts
// Export both client and server functions with consistent naming

export { createClient as createServerClient } from './server';
export { createClient as createBrowserClient } from './client';

// Backward compatibility for existing code
export * from '../supabase';
