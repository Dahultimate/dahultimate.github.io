import { supabase } from "./supabase-client";
import type { AllowedCategory, EventCategory, EventInput, SportEvent } from "../domain/event";
import type { Sex } from "../domain/member";

interface EventRow {
  id: string;
  event_type_id: string;
  category: EventCategory;
  format_id: string;
  division_id: string;
  location: string;
  event_date: string;
  organizer_id: string;
  response_deadline: string;
}

interface AllowedCategoryRow {
  event_id: string;
  sex: Sex;
  age_category_id: string;
}

function toEventRow(input: EventInput) {
  return {
    event_type_id: input.eventTypeId,
    category: input.category,
    format_id: input.formatId,
    division_id: input.divisionId,
    location: input.location,
    event_date: input.eventDate,
    organizer_id: input.organizerId,
    response_deadline: input.responseDeadline,
  };
}

function mapEvent(row: EventRow, allowed: AllowedCategoryRow[]): SportEvent {
  return {
    id: row.id,
    eventTypeId: row.event_type_id,
    category: row.category,
    formatId: row.format_id,
    divisionId: row.division_id,
    location: row.location,
    eventDate: row.event_date,
    organizerId: row.organizer_id,
    responseDeadline: row.response_deadline,
    allowedCategories: allowed.map((a) => ({ sex: a.sex, ageCategoryId: a.age_category_id })),
  };
}

/** Lecture ouverte à tout membre authentifié (RLS events_select_all / event_allowed_categories_select_all). */
export async function fetchEvents(): Promise<SportEvent[]> {
  const [eventsResult, allowedResult] = await Promise.all([
    supabase.from("events").select("*").order("event_date", { ascending: true }),
    supabase.from("event_allowed_categories").select("*"),
  ]);
  if (eventsResult.error || !eventsResult.data) return [];

  const allowedByEvent = new Map<string, AllowedCategoryRow[]>();
  for (const row of (allowedResult.data as AllowedCategoryRow[] | null) ?? []) {
    const list = allowedByEvent.get(row.event_id) ?? [];
    list.push(row);
    allowedByEvent.set(row.event_id, list);
  }

  return (eventsResult.data as EventRow[]).map((row) => mapEvent(row, allowedByEvent.get(row.id) ?? []));
}

async function writeAllowedCategories(eventId: string, allowed: readonly AllowedCategory[]): Promise<string | null> {
  if (allowed.length === 0) return null;
  const { error } = await supabase.from("event_allowed_categories").insert(
    allowed.map((a) => ({ event_id: eventId, sex: a.sex, age_category_id: a.ageCategoryId })),
  );
  return error ? error.message : null;
}

/** Réservé aux admins/coachs (RLS events_write_by_coach). */
export async function createEvent(input: EventInput): Promise<string | null> {
  const { data, error } = await supabase.from("events").insert(toEventRow(input)).select("id").single();
  if (error || !data) return error?.message ?? "La création de l'événement a échoué.";

  const allowedError = await writeAllowedCategories(data.id as string, input.allowedCategories);
  if (allowedError) {
    // Évite un événement orphelin sans catégories autorisées.
    await supabase.from("events").delete().eq("id", data.id as string);
    return allowedError;
  }
  return null;
}

export async function updateEvent(id: string, input: EventInput): Promise<string | null> {
  const { error } = await supabase.from("events").update(toEventRow(input)).eq("id", id);
  if (error) return error.message;

  const { error: deleteError } = await supabase.from("event_allowed_categories").delete().eq("event_id", id);
  if (deleteError) return deleteError.message;

  return writeAllowedCategories(id, input.allowedCategories);
}
