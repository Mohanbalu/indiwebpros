import { createClient } from '@supabase/supabase-js';

let supabaseClient: any = null;

export function getSupabase() {
  if (supabaseClient) return supabaseClient;

  try {
    let metaEnv: Record<string, any> = {};
    try {
      if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
        metaEnv = (import.meta as any).env;
      }
    } catch {
      // Ignore reference error if import.meta is not available in serverless CJS context
    }
    
    // Check process.env and metaEnv for Supabase credentials
    let url = process.env.SUPABASE_URL || 
              process.env.VITE_SUPABASE_URL || 
              process.env.NEXT_PUBLIC_SUPABASE_URL || 
              metaEnv.VITE_SUPABASE_URL || 
              '';

    let key = process.env.SUPABASE_ANON_KEY || 
              process.env.VITE_SUPABASE_ANON_KEY || 
              process.env.SUPABASE_KEY || 
              process.env.VITE_SUPABASE_KEY || 
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
              metaEnv.VITE_SUPABASE_ANON_KEY || 
              '';

    let supabaseUrl = String(url || '').trim();
    let supabaseAnonKey = String(key || '').trim();

    // Aggressively remove any hidden non-ASCII characters
    supabaseUrl = supabaseUrl.replace(/[^\x21-\x7E]/g, '');
    supabaseAnonKey = supabaseAnonKey.replace(/[^\x21-\x7E]/g, '');

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(`Supabase Config Warning: SUPABASE_URL or SUPABASE_ANON_KEY is not defined in environment variables.`);
      return null;
    }

    if (!supabaseUrl.startsWith('http')) {
      supabaseUrl = `https://${supabaseUrl}`;
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
  } catch (err: any) {
    console.error("Error initializing Supabase client:", err.message);
    return null;
  }
}

