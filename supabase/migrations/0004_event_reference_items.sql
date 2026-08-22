-- Phase 4 : référentiels des événements (types, formats, divisions).
-- Les trois listes ont exactement la même forme (un libellé + un ordre
-- d'affichage) : une seule table avec un discriminant "kind", plutôt que
-- trois tables identiques.

create table public.event_reference_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('event_type', 'format', 'division')),
  label text not null,
  sort_order integer not null default 0,
  unique (kind, label)
);

alter table public.event_reference_items enable row level security;

-- Lecture ouverte à tout membre authentifié (utilisées comme listes
-- déroulantes par tout le monde dans le formulaire d'événement, phase 5).
create policy "event_reference_items_select_all"
  on public.event_reference_items
  for select
  to authenticated
  using (true);

create policy "event_reference_items_write_by_admin"
  on public.event_reference_items
  for all
  to authenticated
  using (is_admin())
  with check (is_admin());

insert into public.event_reference_items (kind, label, sort_order) values
  ('event_type', 'Championnat', 0),
  ('event_type', 'Tournoi', 1),
  ('event_type', 'Hat', 2),
  ('event_type', 'Coupe', 3),
  ('event_type', 'Winter League', 4),
  ('format', 'Indoor', 0),
  ('format', 'Outdoor', 1),
  ('format', 'Beach', 2),
  ('division', 'N1', 0),
  ('division', 'N2', 1),
  ('division', 'N3', 2),
  ('division', 'DR1', 3),
  ('division', 'DR2', 4),
  ('division', 'DR3', 5);
