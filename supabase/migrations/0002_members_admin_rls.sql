-- Phase 2 : droits d'écriture admin sur la table members.

-- Un admin peut lire l'annuaire complet (en plus de sa propre fiche, déjà
-- couverte par members_select_own).
create policy "members_select_all_for_admin"
  on public.members
  for select
  to authenticated
  using (is_admin());

-- Un admin peut modifier n'importe quelle fiche (infos, droits is_admin/
-- is_coach, activation). last_login_at et must_change_password restent
-- gérés uniquement par les RPC dédiées (phase 1), jamais via ce canal.
create policy "members_update_by_admin"
  on public.members
  for update
  to authenticated
  using (is_admin())
  with check (is_admin());

-- Validation stricte de l'email au niveau base, en complément du contrôle
-- déjà fait côté formulaire et côté Edge Function à la création.
alter table public.members
  add constraint members_email_format check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$');
