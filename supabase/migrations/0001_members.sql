-- Phase 1 : table des membres, liée à Supabase Auth (auth.users).
-- Un membre = une ligne "public.members" dont l'id est directement l'id
-- de son compte Supabase Auth (créé par l'Edge Function create-member-account).

create table public.members (
  id uuid primary key references auth.users (id) on delete cascade,
  last_name text not null,
  first_name text not null,
  email text not null unique,
  sex text not null check (sex in ('F', 'M')),
  birth_year integer not null check (birth_year between 1900 and extract(year from now())::int),
  license_number text not null unique,
  license_type text not null check (license_type in ('competition', 'loisir')),
  is_admin boolean not null default false,
  is_coach boolean not null default false,
  must_change_password boolean not null default true,
  active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;

-- Un membre authentifié peut lire sa propre fiche.
-- (La lecture de l'annuaire complet par les admins/coachs arrivera en phase 2/6.)
create policy "members_select_own"
  on public.members
  for select
  to authenticated
  using (id = auth.uid());

-- Fonctions utilitaires réutilisées par les policies des phases suivantes.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.members where id = auth.uid()), false);
$$;

-- Un admin a aussi les droits coach (un admin ne doit pas être bloqué
-- sur les actions réservées aux coachs).
create or replace function public.is_coach()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_coach or is_admin from public.members where id = auth.uid()), false);
$$;

-- RPC dédiées appelées par le frontend après connexion / changement de mot
-- de passe : évite d'ouvrir un UPDATE générique sur la table members
-- (dont certaines colonnes, comme is_admin, ne doivent jamais être
-- modifiables par le membre lui-même). Chaque fonction ne peut affecter
-- que la ligne de l'appelant (auth.uid()), aucun paramètre n'est accepté.
create or replace function public.mark_last_login()
returns void
language sql
security definer
set search_path = public
as $$
  update public.members set last_login_at = now() where id = auth.uid();
$$;

create or replace function public.complete_password_change()
returns void
language sql
security definer
set search_path = public
as $$
  update public.members set must_change_password = false where id = auth.uid();
$$;

grant execute on function public.mark_last_login() to authenticated;
grant execute on function public.complete_password_change() to authenticated;
