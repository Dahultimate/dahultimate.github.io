import { supabase } from "./supabase-client";
import type { AgeCategory, AgeCategoryInput } from "../domain/age-category";

interface AgeCategoryRow {
  id: string;
  sex: AgeCategory["sex"];
  label: string;
  min_birth_year: number | null;
  max_birth_year: number | null;
  sort_order: number;
}

function mapAgeCategory(row: AgeCategoryRow): AgeCategory {
  return {
    id: row.id,
    sex: row.sex,
    label: row.label,
    minBirthYear: row.min_birth_year,
    maxBirthYear: row.max_birth_year,
    sortOrder: row.sort_order,
  };
}

function toRow(input: AgeCategoryInput) {
  return {
    sex: input.sex,
    label: input.label,
    min_birth_year: input.minBirthYear,
    max_birth_year: input.maxBirthYear,
    sort_order: input.sortOrder,
  };
}

/** Lecture ouverte à tout membre authentifié (RLS age_categories_select_all). */
export async function fetchAgeCategories(): Promise<AgeCategory[]> {
  const { data, error } = await supabase
    .from("age_categories")
    .select("*")
    .order("sex", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return (data as AgeCategoryRow[]).map(mapAgeCategory);
}

/** Écriture réservée aux admins (RLS age_categories_write_by_admin). */
export async function createAgeCategory(input: AgeCategoryInput): Promise<string | null> {
  const { error } = await supabase.from("age_categories").insert(toRow(input));
  return error ? error.message : null;
}

export async function updateAgeCategory(id: string, input: AgeCategoryInput): Promise<string | null> {
  const { error } = await supabase.from("age_categories").update(toRow(input)).eq("id", id);
  return error ? error.message : null;
}

export async function deleteAgeCategory(id: string): Promise<string | null> {
  const { error } = await supabase.from("age_categories").delete().eq("id", id);
  return error ? error.message : null;
}
