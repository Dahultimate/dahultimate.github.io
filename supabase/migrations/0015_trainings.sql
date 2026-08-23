-- Entraînements (distincts des évènements sportifs/tournois/hats) : au
-- plus un entraînement par jour ("chaque jour... peut être défini un
-- entrainement", singulier -> contrainte unique sur la date).
create table public.trainings (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  format text not null check (format in ('Indoor', 'Outdoor')),
  audience text not null check (audience in ('Open N3', 'Open N2', 'Féminin', 'Mixte', 'Open DR', 'Tous')),
  created_at timestamptz not null default now()
);

alter table public.trainings enable row level security;

-- Lecture ouverte à tout membre authentifié.
create policy "trainings_select_all"
  on public.trainings
  for select
  to authenticated
  using (true);

-- Écriture réservée aux admins.
create policy "trainings_write_by_admin"
  on public.trainings
  for all
  to authenticated
  using (is_admin())
  with check (is_admin());
