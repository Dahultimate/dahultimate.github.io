import { supabase } from "./supabase-client";
import type { EventFamily, EventReferenceItem, EventReferenceItemInput, EventReferenceKind } from "../domain/event-reference";

interface EventReferenceItemRow {
  id: string;
  kind: EventReferenceKind;
  label: string;
  sort_order: number;
  event_family: EventFamily | null;
}

function mapItem(row: EventReferenceItemRow): EventReferenceItem {
  return { id: row.id, kind: row.kind, label: row.label, sortOrder: row.sort_order, eventFamily: row.event_family };
}

/** Lecture ouverte à tout membre authentifié (RLS event_reference_items_select_all). */
export async function fetchEventReferenceItems(kind: EventReferenceKind): Promise<EventReferenceItem[]> {
  const { data, error } = await supabase
    .from("event_reference_items")
    .select("*")
    .eq("kind", kind)
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return (data as EventReferenceItemRow[]).map(mapItem);
}

/** Écriture réservée aux admins (RLS event_reference_items_write_by_admin). */
export async function createEventReferenceItem(
  kind: EventReferenceKind,
  input: EventReferenceItemInput,
): Promise<string | null> {
  const { error } = await supabase
    .from("event_reference_items")
    .insert({ kind, label: input.label, sort_order: input.sortOrder, event_family: input.eventFamily });
  return error ? error.message : null;
}

export async function updateEventReferenceItem(id: string, input: EventReferenceItemInput): Promise<string | null> {
  const { error } = await supabase
    .from("event_reference_items")
    .update({ label: input.label, sort_order: input.sortOrder, event_family: input.eventFamily })
    .eq("id", id);
  return error ? error.message : null;
}

export async function deleteEventReferenceItem(id: string): Promise<string | null> {
  const { error } = await supabase.from("event_reference_items").delete().eq("id", id);
  return error ? error.message : null;
}
