import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

export async function getPrimaryOrganizationId(): Promise<string> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("organizations")
    .select("id")
    .eq("is_primary", true)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(
      `[getPrimaryOrganizationId] query failed: ${error.message}`,
    );
  }

  if (!data?.id) {
    throw new Error(
      "No primary organization found. Ensure organizations seed migration ran.",
    );
  }

  return data.id;
}
