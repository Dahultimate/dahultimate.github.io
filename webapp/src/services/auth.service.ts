import { supabase } from "./supabase-client";
import { fetchOwnMember } from "./members.repository";
import { sessionStore } from "../state/session-store";

export interface AuthError {
  message: string;
}

async function refreshMember(): Promise<void> {
  const member = await fetchOwnMember();
  if (member) {
    sessionStore.setState({ status: "signed-in", member });
  } else {
    sessionStore.setState({ status: "signed-out" });
  }
}

/** À appeler une seule fois au démarrage de l'app pour suivre l'état de connexion Supabase Auth. */
export function initAuthListener(): void {
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      void refreshMember();
    } else {
      sessionStore.setState({ status: "signed-out" });
    }
  });
}

export async function signIn(email: string, password: string): Promise<AuthError | null> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { message: "Email ou mot de passe incorrect." };
  }
  await supabase.rpc("mark_last_login");
  return null;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function changePassword(newPassword: string): Promise<AuthError | null> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    return { message: "Le changement de mot de passe a échoué." };
  }
  await supabase.rpc("complete_password_change");
  await refreshMember();
  return null;
}
