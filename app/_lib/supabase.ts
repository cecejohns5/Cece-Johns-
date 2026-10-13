import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Connects to Supabase from the server. The URL and publishable key come
// from Vercel's environment variables, never from this file.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Returns null when the settings are missing, so the site still loads
// instead of crashing with "Internal Server Error".
export async function createClient() {
  if (!supabaseUrl || !supabaseKey) return null;

  const cookieStore = await cookies();

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Pages can't write cookies; proxy.ts refreshes them instead.
          }
        },
      },
    },
  );
}
