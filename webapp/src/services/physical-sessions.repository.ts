import { supabase } from "./supabase-client";
import { SESSION_EXERCISE_SLOT_COUNT, type PhysicalSession, type PhysicalSessionInput } from "../domain/physical-session";
import type { PhysicalExerciseType } from "../domain/physical-exercise";
import type { PrepType } from "../domain/physical-session";

interface PhysicalSessionRow {
  id: string;
  name: string;
  objective: PhysicalExerciseType | null;
  prep_type: PrepType | null;
  series_count: number | null;
  exercise_duration_seconds: number | null;
  rest_duration_seconds: number | null;
  between_series_duration_seconds: number | null;
  exercise_1_id: string | null;
  exercise_2_id: string | null;
  exercise_3_id: string | null;
  exercise_4_id: string | null;
  exercise_5_id: string | null;
  exercise_6_id: string | null;
  exercise_7_id: string | null;
  exercise_8_id: string | null;
  finisher_id: string | null;
}

function mapSession(row: PhysicalSessionRow): PhysicalSession {
  return {
    id: row.id,
    name: row.name,
    objective: row.objective,
    prepType: row.prep_type,
    seriesCount: row.series_count,
    exerciseDurationSeconds: row.exercise_duration_seconds,
    restDurationSeconds: row.rest_duration_seconds,
    betweenSeriesDurationSeconds: row.between_series_duration_seconds,
    exerciseIds: [
      row.exercise_1_id,
      row.exercise_2_id,
      row.exercise_3_id,
      row.exercise_4_id,
      row.exercise_5_id,
      row.exercise_6_id,
      row.exercise_7_id,
      row.exercise_8_id,
    ],
    finisherId: row.finisher_id,
  };
}

function toRow(input: PhysicalSessionInput) {
  if (input.exerciseIds.length !== SESSION_EXERCISE_SLOT_COUNT) {
    throw new Error(`exerciseIds doit contenir exactement ${SESSION_EXERCISE_SLOT_COUNT} créneaux.`);
  }
  return {
    name: input.name,
    objective: input.objective,
    prep_type: input.prepType,
    series_count: input.seriesCount,
    exercise_duration_seconds: input.exerciseDurationSeconds,
    rest_duration_seconds: input.restDurationSeconds,
    between_series_duration_seconds: input.betweenSeriesDurationSeconds,
    exercise_1_id: input.exerciseIds[0],
    exercise_2_id: input.exerciseIds[1],
    exercise_3_id: input.exerciseIds[2],
    exercise_4_id: input.exerciseIds[3],
    exercise_5_id: input.exerciseIds[4],
    exercise_6_id: input.exerciseIds[5],
    exercise_7_id: input.exerciseIds[6],
    exercise_8_id: input.exerciseIds[7],
    finisher_id: input.finisherId,
  };
}

/** Lecture ouverte à tout membre authentifié (RLS physical_sessions_select_all). */
export async function fetchPhysicalSessions(): Promise<PhysicalSession[]> {
  const { data, error } = await supabase.from("physical_sessions").select("*").order("name", { ascending: true });
  if (error || !data) return [];
  return (data as PhysicalSessionRow[]).map(mapSession);
}

/** Écriture réservée aux admins (RLS physical_sessions_write_by_admin). */
export async function createPhysicalSession(input: PhysicalSessionInput): Promise<string | null> {
  const { error } = await supabase.from("physical_sessions").insert(toRow(input));
  return error ? error.message : null;
}

export async function updatePhysicalSession(id: string, input: PhysicalSessionInput): Promise<string | null> {
  const { error } = await supabase.from("physical_sessions").update(toRow(input)).eq("id", id);
  return error ? error.message : null;
}

export async function deletePhysicalSession(id: string): Promise<string | null> {
  const { error } = await supabase.from("physical_sessions").delete().eq("id", id);
  return error ? error.message : null;
}
