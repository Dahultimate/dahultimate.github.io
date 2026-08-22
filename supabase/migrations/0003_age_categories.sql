-- Phase 3 : tranches d'âge, éditables par l'admin. La catégorie d'un
-- membre n'est jamais stockée : elle est recalculée à la volée côté
-- frontend à partir de ces tranches (voir webapp/src/domain/age-category.ts).

create table public.age_categories (
  id uuid primary key default gen_random_uuid(),
  sex text not null check (sex in ('F', 'M')),
  label text not null,
  min_birth_year integer,
  max_birth_year integer,
  sort_order integer not null default 0,
  constraint age_categories_range_valid check (
    min_birth_year is null or max_birth_year is null or min_birth_year <= max_birth_year
  )
);

alter table public.age_categories enable row level security;

-- Tout membre authentifié doit pouvoir lire les tranches (utilisées pour
-- afficher la catégorie de n'importe quel membre, et plus tard pour filtrer
-- les catégories autorisées à un événement).
create policy "age_categories_select_all"
  on public.age_categories
  for select
  to authenticated
  using (true);

create policy "age_categories_write_by_admin"
  on public.age_categories
  for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- Seed : règles exactes de la spec (bornes "incluses").
insert into public.age_categories (sex, label, min_birth_year, max_birth_year, sort_order) values
  ('F', 'Great Grand Master', null, 1982, 0),
  ('F', 'Grand Master', 1983, 1990, 1),
  ('F', 'Master', 1991, 1997, 2),
  ('F', 'Sénior', 1998, 2007, 3),
  ('F', 'U20', 2008, 2010, 4),
  ('F', 'U17', 2011, 2012, 5),
  ('F', 'U15', 2013, 2014, 6),
  ('F', 'U13', 2015, 2016, 7),
  ('F', 'U11', 2017, null, 8),
  ('M', 'Great Grand Master', null, 1979, 0),
  ('M', 'Grand Master', 1980, 1987, 1),
  ('M', 'Master', 1988, 1994, 2),
  ('M', 'Sénior', 1995, 2007, 3),
  ('M', 'U20', 2008, 2010, 4),
  ('M', 'U17', 2011, 2012, 5),
  ('M', 'U15', 2013, 2014, 6),
  ('M', 'U13', 2015, 2016, 7),
  ('M', 'U11', 2017, null, 8);
