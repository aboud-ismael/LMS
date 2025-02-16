import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://tmojowyfzmmbutgziusz.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtb2pvd3lmem1tYnV0Z3ppdXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NzE2NzAsImV4cCI6MjAyNjQ0NzY3MH0.Wd_oGHvSFKBvpUJxvHXXVbkIkrWJzwvD_aVYnvhQmVE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
