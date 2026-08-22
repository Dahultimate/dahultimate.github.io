import { supabase } from "./supabase-client";
import type { Member, MemberUpdateInput } from "../domain/member";

interface MemberRow {
  id: string;
  last_name: string;
  first_name: string;
  email: string;
  sex: Member["sex"];
  birth_year: number;
  license_number: string;
  license_type: Member["licenseType"];
  is_admin: boolean;
  is_coach: boolean;
  must_change_password: boolean;
  active: boolean;
  last_login_at: string | null;
}

function mapMember(row: MemberRow): Member {
  return {
    id: row.id,
    lastName: row.last_name,
    firstName: row.first_name,
    email: row.email,
    sex: row.sex,
    birthYear: row.birth_year,
    licenseNumber: row.license_number,
    licenseType: row.license_type,
    isAdmin: row.is_admin,
    isCoach: row.is_coach,
    mustChangePassword: row.must_change_password,
    active: row.active,
    lastLoginAt: row.last_login_at,
  };
}

/** Récupère la fiche du membre actuellement authentifié. */
export async function fetchOwnMember(): Promise<Member | null> {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase.from("members").select("*").eq("id", userId).maybeSingle<MemberRow>();
  if (error || !data) return null;
  return mapMember(data);
}

/** Annuaire complet, réservé aux admins (RLS members_select_all_for_admin). */
export async function fetchAllMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("last_name", { ascending: true })
    .order("first_name", { ascending: true });
  if (error || !data) return [];
  return (data as MemberRow[]).map(mapMember);
}

/** Modifie la fiche d'un membre existant, réservé aux admins (RLS members_update_by_admin). */
export async function updateMember(id: string, input: MemberUpdateInput): Promise<string | null> {
  const { error } = await supabase
    .from("members")
    .update({
      last_name: input.lastName,
      first_name: input.firstName,
      email: input.email,
      sex: input.sex,
      birth_year: input.birthYear,
      license_number: input.licenseNumber,
      license_type: input.licenseType,
      is_admin: input.isAdmin,
      is_coach: input.isCoach,
      active: input.active,
    })
    .eq("id", id);
  return error ? error.message : null;
}
