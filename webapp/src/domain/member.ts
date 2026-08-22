export type Sex = "F" | "M";
export type LicenseType = "competition" | "loisir";

export interface Member {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  sex: Sex;
  birthYear: number;
  licenseNumber: string;
  licenseType: LicenseType;
  isAdmin: boolean;
  isCoach: boolean;
  mustChangePassword: boolean;
  active: boolean;
  lastLoginAt: string | null;
}

/** Champs saisis par l'admin à la création d'un membre (contrat de l'Edge Function create-member-account). */
export interface NewMemberInput {
  lastName: string;
  firstName: string;
  email: string;
  sex: Sex;
  birthYear: number;
  licenseNumber: string;
  licenseType: LicenseType;
}

/** Champs modifiables par l'admin sur une fiche existante (via UPDATE direct, RLS members_update_by_admin). */
export type MemberUpdateInput = NewMemberInput & {
  isAdmin: boolean;
  isCoach: boolean;
  active: boolean;
};

/** Annuaire minimal exposé à tout membre authentifié (RPC member_directory), sans données sensibles. */
export interface MemberDirectoryEntry {
  id: string;
  firstName: string;
  lastName: string;
  sex: Sex;
  birthYear: number;
}
