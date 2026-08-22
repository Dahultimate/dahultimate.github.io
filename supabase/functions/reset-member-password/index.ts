// Edge Function (admin uniquement) : réinitialise le mot de passe d'un
// membre à son numéro de licence et l'oblige à en choisir un nouveau à sa
// prochaine connexion (must_change_password = true).

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

  const { data: member, error: fetchError } = await admin
    .from("members")
    .select("license_number")
    .eq("id", memberId)
    .maybeSingle();

  if (fetchError || !member) {
    return jsonResponse({ error: "Membre introuvable" }, 404);
  }

  const { error: authError } = await admin.auth.admin.updateUserById(memberId, {
    password: member.license_number,
  });
  if (authError) {
    return jsonResponse({ error: authError.message }, 400);
  }

  const { error: updateError } = await admin
    .from("members")
    .update({ must_change_password: true })
    .eq("id", memberId);
  if (updateError) {
    return jsonResponse({ error: updateError.message }, 400);
  }

  return jsonResponse({ ok: true }, 200);
});
