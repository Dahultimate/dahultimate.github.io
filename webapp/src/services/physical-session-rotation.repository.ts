import { supabase } from "./supabase-client";

interface RotationRow {
  session_ids: string[];
}

/** Lecture ouverte à tout membre authentifié (RLS physical_session_rotation_select_all). */
export async function fetchSessionRotation(): Promise<string[]> {
  const { data, error } = await supabase
    .from("physical_session_rotation")
    .select("session_ids")
    .eq("id", 1)
    .maybeSingle<RotationRow>();
  if (error || !data) return [];
  return data.session_ids;
}

/** Écriture réservée aux admins (RLS physical_session_rotation_update_by_admin). */
export async function updateSessionRotation(sessionIds: readonly string[]): Promise<string | null> {
  const { error } = await supabase
    .from("physical_session_rotation")
    .update({ session_ids: sessionIds })
    .eq("id", 1);
  return error ? error.message : null;
}
