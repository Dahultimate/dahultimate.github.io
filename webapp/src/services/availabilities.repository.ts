import { supabase } from "./supabase-client";
import type { AvailabilityStatus } from "../domain/availability";

interface AvailabilityRow {
  member_id: string;
  status: AvailabilityStatus;
}

/** Lecture ouverte à tout membre authentifié (RLS availabilities_select_all). L'écriture arrive en phase 7. */
export async function fetchAvailabilitiesForEvent(eventId: string): Promise<Map<string, AvailabilityStatus>> {
  const { data, error } = await supabase
    .from("availabilities")
    .select("member_id, status")
    .eq("event_id", eventId);
  if (error || !data) return new Map();
  return new Map((data as AvailabilityRow[]).map((row) => [row.member_id, row.status]));
}
