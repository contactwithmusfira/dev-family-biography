import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabasePublicEnv } from "@/lib/env/public";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    supabasePublicEnv.url,
    supabasePublicEnv.publishableKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll can fail in Server Components; proxy handles refresh.
          }
        },
      },
    },
  );
}
