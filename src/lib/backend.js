// Whether a Supabase backend is configured, and a lazy loader for the client.
// The client is loaded with a dynamic import so visitors only download it when a
// backend exists. Without the env vars the site simply serves its built-in content.

// Supabase now calls the public key the "publishable key"; the old name was "anon key".
// Both names are accepted so either of Supabase's snippets works.
export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const backendConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && supabaseKey);

let clientPromise = null;

export function getSupabase() {
  if (!backendConfigured) return Promise.resolve(null);
  clientPromise ??= import("./supabase.js").then((m) => m.supabase);
  return clientPromise;
}
