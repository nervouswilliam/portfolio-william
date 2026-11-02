import { createClient } from "@supabase/supabase-js";
import { supabaseKey } from "./backend";

// The anon key is public by design. What protects the data is row-level security
// in supabase/schema.sql, not secrecy of this key.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  supabaseKey,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "pkce" } }
);
