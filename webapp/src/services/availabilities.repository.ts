import { supabase } from "./supabase-client";
import type { AvailabilityStatus } from "../domain/availability";

interface AvailabilityRow {
  member_id: string;
  status: AvailabilityStatus;
}

/** Lecture ouverte à tout membre authentifié (RLS availabilities_select_all). */
export async function fetchAvailabilitiesForEvent(eventId: string): Promise<Map<string, AvailabilityStatus>> {
  const { data, error } = await supabase
    .from("availabilities")
    .select("member_id, status")
    .eq("event_id", eventId);
  if (error || !data) return new Map();
  return new Map((data as AvailabilityRow[]).map((row) => [row.member_id, row.status]));
}

/** Ids des événements pour lesquels le membre courant a déjà répondu (page d'accueil). */
export async function fetchOwnRespondedEventIds(): Promise<Set<string>> {
  const { data: userData } = await supabase.auth.getUser();
  const memberId = userData.user?.id;
  if (!memberId) return new Set();

  const { data, error } = await supabase.from("availabilities").select("event_id").eq("member_id", memberId);
  if (error || !data) return new Set();
  return new Set((data as { event_id: string }[]).map((row) => row.event_id));
}

/**
 * Déclare/modifie la disponibilité du membre courant pour un événement.
 * Réservé à sa propre ligne, avant la date butoir (RLS
 * availabilities_insert/update_own_before_deadline) — un rejet RLS après
 * la date butoir remonte ici comme une erreur générique.
 */
export async function submitAvailability(eventId: string, status: AvailabilityStatus): Promise<string | null> {
  const { data: userData } = await supabase.auth.getUser();
  const memberId = userData.user?.id;
  if (!memberId) return "Vous devez être connecté pour répondre.";

  const { error } = await supabase
    .from("availabilities")
    .upsert(
      { event_id: eventId, member_id: memberId, status, responded_at: new Date().toISOString() },
      { onConflict: "event_id,member_id" },
    );
  return error ? error.message : null;
}
