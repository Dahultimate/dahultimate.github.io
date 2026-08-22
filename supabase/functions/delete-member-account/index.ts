// Edge Function (admin uniquement) : supprime définitivement le compte
// Auth d'un membre. La suppression cascade vers sa fiche public.members
// (FK members.id -> auth.users.id on delete cascade).

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { jsonResponse } from "../_shared/http.ts";
import { requireAdmin } from "../_shared/require-admin.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Méthode non autorisée" }, 405);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const callerIdOrError = await requireAdmin(admin, req);
  if (callerIdOrError instanceof Response) return callerIdOrError;
  const callerId = callerIdOrError;

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "JSON invalide" }, 400);
  }

  const memberId = (payload as { memberId?: unknown } | null)?.memberId;
  if (typeof memberId !== "string" || !UUID_RE.test(memberId)) {
    return jsonResponse({ error: "memberId invalide" }, 400);
  }

  if (memberId === callerId) {
    return jsonResponse({ error: "Vous ne pouvez pas supprimer votre propre compte" }, 400);
  }

  const { error } = await admin.auth.admin.deleteUser(memberId);
  if (error) {
    return jsonResponse({ error: error.message }, 400);
  }

  return jsonResponse({ ok: true }, 200);
});
