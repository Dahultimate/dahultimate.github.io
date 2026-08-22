// Edge Function : crée le compte Supabase Auth d'un membre (mot de passe
// initial = numéro de licence) puis sa fiche dans public.members.
//
// - Si la table members est vide, ce premier appel est accepté sans être
//   admin ("bootstrap") et crée automatiquement un administrateur : c'est
//   la seule façon d'amorcer le tout premier compte de l'application.
// - Sinon, l'appelant doit être authentifié et être admin.
//
// Ne s'exécute jamais côté navigateur : SUPABASE_SERVICE_ROLE_KEY n'est
// disponible que dans l'environnement des Edge Functions.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { jsonResponse } from "../_shared/http.ts";
import { requireAdmin } from "../_shared/require-admin.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

type Sex = "F" | "M";
type LicenseType = "competition" | "loisir";

interface CreateMemberPayload {
  lastName: string;
  firstName: string;
  email: string;
  sex: Sex;
  birthYear: number;
  licenseNumber: string;
  licenseType: LicenseType;
}

function isValidPayload(body: unknown): body is CreateMemberPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  const currentYear = new Date().getFullYear();
  return (
    typeof b.lastName === "string" && b.lastName.trim().length > 0 &&
    typeof b.firstName === "string" && b.firstName.trim().length > 0 &&
    typeof b.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    (b.sex === "F" || b.sex === "M") &&
    typeof b.birthYear === "number" && Number.isInteger(b.birthYear) &&
    b.birthYear >= 1900 && b.birthYear <= currentYear &&
    typeof b.licenseNumber === "string" && b.licenseNumber.trim().length > 0 &&
    (b.licenseType === "competition" || b.licenseType === "loisir")
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Méthode non autorisée" }, 405);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "JSON invalide" }, 400);
  }

  if (!isValidPayload(payload)) {
    return jsonResponse({ error: "Champs invalides" }, 400);
  }

  const { count, error: countError } = await admin
    .from("members")
    .select("id", { count: "exact", head: true });

  if (countError) {
    return jsonResponse({ error: countError.message }, 500);
  }

  const isBootstrap = (count ?? 0) === 0;

  if (!isBootstrap) {
    const callerIdOrError = await requireAdmin(admin, req);
    if (callerIdOrError instanceof Response) return callerIdOrError;
  }

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email: payload.email,
    password: payload.licenseNumber,
    email_confirm: true,
  });

  if (createError || !created.user) {
    return jsonResponse({ error: createError?.message ?? "Création du compte impossible" }, 400);
  }

  const { data: member, error: insertError } = await admin
    .from("members")
    .insert({
      id: created.user.id,
      last_name: payload.lastName,
      first_name: payload.firstName,
      email: payload.email,
      sex: payload.sex,
      birth_year: payload.birthYear,
      license_number: payload.licenseNumber,
      license_type: payload.licenseType,
      is_admin: isBootstrap,
      is_coach: false,
      must_change_password: true,
      active: true,
    })
    .select()
    .single();

  if (insertError) {
    // Évite un compte Auth orphelin si l'insertion de la fiche membre échoue
    // (ex : numéro de licence ou email déjà utilisé par une autre ligne).
    await admin.auth.admin.deleteUser(created.user.id);
    return jsonResponse({ error: insertError.message }, 400);
  }

  return jsonResponse({ member }, 201);
});
