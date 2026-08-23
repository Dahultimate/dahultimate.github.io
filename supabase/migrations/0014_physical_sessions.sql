-- Sessions de préparation physique : un objectif (même liste que les
-- types d'exercice), un type de prépa, des paramètres de séries/durées, et
-- jusqu'à 8 exercices + un finisher, chaque champ étant facultatif.
create table public.physical_sessions (
  id uuid primary key default gen_random_uuid(),
  -- Nom non prévu explicitement par la demande, mais nécessaire pour
  -- identifier une session dans la liste admin et le roulement.
  name text not null,
  objective text check (objective in (
    'Course', 'Jambes', 'Abdos', 'Dos', 'Bras',
    'Cardio', 'Mobilité / Plio', 'Disque', 'Proprioception'
  )),
  prep_type text check (prep_type in ('Tabata', 'Cardio')),
  series_count integer check (series_count is null or series_count > 0),
  exercise_duration_seconds integer check (exercise_duration_seconds is null or exercise_duration_seconds > 0),
  rest_duration_seconds integer check (rest_duration_seconds is null or rest_duration_seconds >= 0),
  between_series_duration_seconds integer check (between_series_duration_seconds is null or between_series_duration_seconds >= 0),
  exercise_1_id uuid references public.physical_exercises (id) on delete set null,
  exercise_2_id uuid references public.physical_exercises (id) on delete set null,
  exercise_3_id uuid references public.physical_exercises (id) on delete set null,
  exercise_4_id uuid references public.physical_exercises (id) on delete set null,
  exercise_5_id uuid references public.physical_exercises (id) on delete set null,
  exercise_6_id uuid references public.physical_exercises (id) on delete set null,
  exercise_7_id uuid references public.physical_exercises (id) on delete set null,
  exercise_8_id uuid references public.physical_exercises (id) on delete set null,
  finisher_id uuid references public.physical_exercises (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint physical_sessions_name_not_blank check (btrim(name) <> '')
);

alter table public.physical_sessions enable row level security;

create policy "physical_sessions_select_all"
  on public.physical_sessions
  for select
  to authenticated
  using (true);

create policy "physical_sessions_write_by_admin"
  on public.physical_sessions
  for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- Roulement des sessions : une seule ligne (singleton), un tableau ordonné
-- d'ids de session qui forme le cycle ("Semaine 1: X, Semaine 2: Y, Semaine
-- 3: Z, Semaine 4: X, ..." = le tableau [X, Y, Z] rejoué en boucle). La
-- "semaine courante" est déterminée côté frontend via le numéro de semaine
-- ISO-8601 modulo la longueur du roulement (domain/iso-week.ts).
create table public.physical_session_rotation (
  id integer primary key default 1,
  session_ids uuid[] not null default '{}',
  constraint physical_session_rotation_singleton check (id = 1)
);

insert into public.physical_session_rotation (id, session_ids) values (1, '{}');

alter table public.physical_session_rotation enable row level security;

create policy "physical_session_rotation_select_all"
  on public.physical_session_rotation
  for select
  to authenticated
  using (true);

create policy "physical_session_rotation_update_by_admin"
  on public.physical_session_rotation
  for update
  to authenticated
  using (is_admin())
  with check (is_admin());
