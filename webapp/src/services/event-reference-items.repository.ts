import { supabase } from "./supabase-client";
import type { EventReferenceItem, EventReferenceItemInput, EventReferenceKind } from "../domain/event-reference";

interface EventReferenceItemRow {
  id: string;
  kind: EventReferenceKind;
  label: string;
  sort_order: number;
}

function mapItem(row: EventReferenceItemRow): EventReferenceItem {
  return { id: row.id, kind: row.kind, label: row.label, sortOrder: row.sort_order };
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
    .insert({ kind, label: input.label, sort_order: input.sortOrder });
  return error ? error.message : null;
}

export async function updateEventReferenceItem(id: string, input: EventReferenceItemInput): Promise<string | null> {
  const { error } = await supabase
    .from("event_reference_items")
    .update({ label: input.label, sort_order: input.sortOrder })
    .eq("id", id);
  return error ? error.message : null;
}

export async function deleteEventReferenceItem(id: string): Promise<string | null> {
  const { error } = await supabase.from("event_reference_items").delete().eq("id", id);
  return error ? error.message : null;
}
