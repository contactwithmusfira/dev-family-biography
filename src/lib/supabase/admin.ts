import { createClient } from "@supabase/supabase-js";

import { serverEnv } from "@/lib/env/server";
import { supabasePublicEnv } from "@/lib/env/public";

/**
 * Server-only Supabase client with secret key privileges.
 * Use for webhooks, invites, and other trusted server operations.
 */
export function createAdminClient() {
  return createClient(supabasePublicEnv.url, serverEnv.SUPABASE_SECRET_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
