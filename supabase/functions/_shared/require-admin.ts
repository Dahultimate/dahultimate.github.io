import type { SupabaseClient } from "npm:@supabase/supabase-js@2";
import { jsonResponse } from "./http.ts";

/**
 * Vérifie que la requête porte le jeton d'un membre admin.
 * Retourne l'id de l'appelant en cas de succès, ou une Response d'erreur
 * à renvoyer telle quelle sinon.
 */
export async function requireAdmin(admin: SupabaseClient, req: Request): Promise<string | Response> {
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer /, "");
  if (!token) {
    return jsonResponse({ error: "Authentification requise" }, 401);
  }

  const { data: callerAuth } = await admin.auth.getUser(token);
  const callerId = callerAuth.user?.id;
  if (!callerId) {
    return jsonResponse({ error: "Authentification invalide" }, 401);
  }

  const { data: callerMember } = await admin
    .from("members")
    .select("is_admin")
    .eq("id", callerId)
    .maybeSingle();

  if (!callerMember?.is_admin) {
    return jsonResponse({ error: "Droits administrateur requis" }, 403);
  }

  return callerId;
}
