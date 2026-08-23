import { supabase } from "./supabase-client";
import type { PhysicalExercise, PhysicalExerciseInput, PhysicalExerciseType } from "../domain/physical-exercise";

interface PhysicalExerciseRow {
  id: string;
  name: string;
  types: PhysicalExerciseType[];
  instructions: string | null;
  video_url: string | null;
}

function mapExercise(row: PhysicalExerciseRow): PhysicalExercise {
  return {
    id: row.id,
    name: row.name,
    types: row.types,
    instructions: row.instructions,
    videoUrl: row.video_url,
  };
}

function toRow(input: PhysicalExerciseInput) {
  return {
    name: input.name,
    types: input.types,
    instructions: input.instructions,
    video_url: input.videoUrl,
  };
}

/** Lecture ouverte à tout membre authentifié (RLS physical_exercises_select_all). */
export async function fetchPhysicalExercises(): Promise<PhysicalExercise[]> {
  const { data, error } = await supabase.from("physical_exercises").select("*").order("name", { ascending: true });
  if (error || !data) return [];
  return (data as PhysicalExerciseRow[]).map(mapExercise);
}

/** Écriture réservée aux admins (RLS physical_exercises_write_by_admin). */
export async function createPhysicalExercise(input: PhysicalExerciseInput): Promise<string | null> {
  const { error } = await supabase.from("physical_exercises").insert(toRow(input));
  return error ? error.message : null;
}

export async function updatePhysicalExercise(id: string, input: PhysicalExerciseInput): Promise<string | null> {
  const { error } = await supabase.from("physical_exercises").update(toRow(input)).eq("id", id);
  return error ? error.message : null;
}

export async function deletePhysicalExercise(id: string): Promise<string | null> {
  const { error } = await supabase.from("physical_exercises").delete().eq("id", id);
  return error ? error.message : null;
}
