import { supabase } from "./supabase-client";
import type { MemberDirectoryEntry } from "../domain/member";

interface MemberDirectoryRow {
  id: string;
  first_name: string;
  last_name: string;
  sex: MemberDirectoryEntry["sex"];
  birth_year: number;
}

/** Annuaire minimal (nom, sexe, année de naissance), lisible par tout membre authentifié via la RPC member_directory. */
export async function fetchMemberDirectory(): Promise<MemberDirectoryEntry[]> {
  const { data, error } = await supabase.rpc("member_directory");
  if (error || !data) return [];
  return (data as MemberDirectoryRow[]).map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    sex: row.sex,
    birthYear: row.birth_year,
  }));
}
