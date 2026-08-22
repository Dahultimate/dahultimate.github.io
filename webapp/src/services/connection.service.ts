import { supabaseUrl, supabaseAnonKey } from "./supabase-client";
import type { ConnectionStatus } from "../domain/connection-status";

/**
 * Vérifie que le projet Supabase configuré répond, sans dépendre d'une table
 * applicative (utile en phase 0, avant toute migration de schéma).
 *
 * On interroge /auth/v1/health plutôt que la racine /rest/v1/ : sur les
 * projets utilisant les nouvelles clés API Supabase (sb_publishable_...),
 * la racine PostgREST exige une clé secrète et rejette la clé publique.
 */
export async function checkSupabaseConnection(): Promise<ConnectionStatus> {
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: { apikey: supabaseAnonKey },
    });
    return response.ok ? "connected" : "error";
  } catch {
    return "error";
  }
}
