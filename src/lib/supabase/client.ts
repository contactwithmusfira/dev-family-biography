"use client";

import { createBrowserClient } from "@supabase/ssr";

import { supabasePublicEnv } from "@/lib/env/public";

export function createClient() {
  return createBrowserClient(
    supabasePublicEnv.url,
    supabasePublicEnv.publishableKey,
  );
}
