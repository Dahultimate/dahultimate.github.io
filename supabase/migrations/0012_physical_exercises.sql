-- Exercices de préparation physique. Les "types" sont une liste fixe (pas
-- éditable par l'admin, contrairement aux référentiels d'événements) : un
-- tableau text[] contraint suffit, pas besoin d'une table de référence.

create table public.physical_exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  types text[] not null default '{}',
  instructions text,
  video_url text,
  created_at timestamptz not null default now(),
  constraint physical_exercises_name_not_blank check (btrim(name) <> ''),
  constraint physical_exercises_types_valid check (
    types <@ array[
      'Course', 'Jambes', 'Abdos', 'Dos', 'Bras',
      'Cardio', 'Mobilité / Plio', 'Disque', 'Proprioception'
    ]::text[]
  )
);

alter table public.physical_exercises enable row level security;

-- Lecture ouverte à tout membre authentifié.
create policy "physical_exercises_select_all"
  on public.physical_exercises
  for select
  to authenticated
  using (true);

-- Écriture réservée aux admins.
create policy "physical_exercises_write_by_admin"
  on public.physical_exercises
  for all
  to authenticated
  using (is_admin())
  with check (is_admin());
