import { supabase } from "./supabase-client";
import { updateMember as updateMemberRow } from "./members.repository";
import type { Member, MemberUpdateInput, NewMemberInput } from "../domain/member";

export interface AdminActionError {
  message: string;
}

async function extractFunctionErrorMessage(error: unknown, fallback: string): Promise<string> {
  const context = (error as { context?: Response }).context;
  if (context) {
    try {
      const body = (await context.clone().json()) as { error?: string };
      if (body.error) return body.error;
    } catch {
      // ignore, on retombe sur le message par défaut
    }
  }
  return fallback;
}

/** Crée le compte + la fiche d'un nouveau membre (mot de passe initial = numéro de licence). */
export async function createMember(input: NewMemberInput): Promise<AdminActionError | { member: Member }> {
  const { data, error } = await supabase.functions.invoke<{ member: Member }>("create-member-account", {
    body: input,
  });
  if (error) {
    return { message: await extractFunctionErrorMessage(error, "La création du membre a échoué.") };
  }
  if (!data) {
    return { message: "Réponse invalide du serveur." };
  }
  return data;
}

/** Met à jour les informations et droits d'un membre existant. */
export async function updateMember(id: string, input: MemberUpdateInput): Promise<AdminActionError | null> {
  const message = await updateMemberRow(id, input);
  return message ? { message } : null;
}

/** Réinitialise le mot de passe d'un membre à son numéro de licence. */
export async function resetMemberPassword(memberId: string): Promise<AdminActionError | null> {
  const { error } = await supabase.functions.invoke("reset-member-password", {
    body: { memberId },
  });
  if (error) {
    return { message: await extractFunctionErrorMessage(error, "La réinitialisation a échoué.") };
  }
  return null;
}

/** Supprime définitivement le compte d'un membre. */
export async function deleteMember(memberId: string): Promise<AdminActionError | null> {
  const { error } = await supabase.functions.invoke("delete-member-account", {
    body: { memberId },
  });
  if (error) {
    return { message: await extractFunctionErrorMessage(error, "La suppression a échoué.") };
  }
  return null;
}
