'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from './server';
import { SupabaseClient } from '@supabase/supabase-js';

// Create a context for the Supabase client
const SupabaseContext = createContext<SupabaseClient | null>(null);

// Provider component to initialize Supabase client only on the client side
export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const client = await createClient();
        setSupabase(client);
      } catch (error) {
        console.error('Failed to initialize Supabase client:', error);
      }
    };
    
    initializeSupabase();
  }, []);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

// Hook to access Supabase client
export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === null) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}
