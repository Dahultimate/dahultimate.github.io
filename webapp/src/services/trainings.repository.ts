import { supabase } from "./supabase-client";
import type { Training, TrainingInput } from "../domain/training";

interface TrainingRow {
  id: string;
  date: string;
  format: Training["format"];
  audience: Training["audience"];
}

function mapTraining(row: TrainingRow): Training {
  return { id: row.id, date: row.date, format: row.format, audience: row.audience };
}

/** Lecture ouverte à tout membre authentifié (RLS trainings_select_all). */
export async function fetchTrainings(): Promise<Training[]> {
  const { data, error } = await supabase.from("trainings").select("*").order("date", { ascending: true });
  if (error || !data) return [];
  return (data as TrainingRow[]).map(mapTraining);
}

/** Écriture réservée aux admins (RLS trainings_write_by_admin). */
export async function createTraining(input: TrainingInput): Promise<string | null> {
  const { error } = await supabase.from("trainings").insert(input);
  return error ? error.message : null;
}

export async function updateTraining(id: string, input: TrainingInput): Promise<string | null> {
  const { error } = await supabase.from("trainings").update(input).eq("id", id);
  return error ? error.message : null;
}

export async function deleteTraining(id: string): Promise<string | null> {
  const { error } = await supabase.from("trainings").delete().eq("id", id);
  return error ? error.message : null;
}

export interface RecurringTrainingsResult {
  created: number;
  /** Dates qui avaient déjà un entraînement déclaré : laissées inchangées, pas écrasées. */
  skipped: number;
}

/**
 * Déclare le même entraînement (format + public) sur plusieurs dates d'un
 * coup (ex. tous les mercredis jusqu'à une date). Les dates qui ont déjà un
 * entraînement (contrainte d'unicité sur `date`) sont ignorées plutôt
 * qu'écrasées.
 */
export async function createRecurringTrainings(
  dates: readonly string[],
  format: Training["format"],
  audience: Training["audience"],
): Promise<RecurringTrainingsResult | string> {
  if (dates.length === 0) return { created: 0, skipped: 0 };

  const { data: existing, error: fetchError } = await supabase.from("trainings").select("date").in("date", dates);
  if (fetchError) return fetchError.message;

  const existingDates = new Set((existing as { date: string }[] | null)?.map((r) => r.date) ?? []);
  const toInsert = dates.filter((date) => !existingDates.has(date)).map((date) => ({ date, format, audience }));

  if (toInsert.length === 0) return { created: 0, skipped: dates.length };

  const { error: insertError } = await supabase.from("trainings").insert(toInsert);
  if (insertError) return insertError.message;

  return { created: toInsert.length, skipped: dates.length - toInsert.length };
}
