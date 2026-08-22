-- Contrairement à l'énoncé initial, les coachs ne doivent finalement ni
-- créer ni modifier d'événements : cette action est réservée aux admins.
-- La policy précédente ("for all" avec is_coach()) est remplacée.

drop policy "events_write_by_coach" on public.events;

create policy "events_write_by_admin"
  on public.events
  for all
  to authenticated
  using (is_admin())
  with check (is_admin());

drop policy "event_allowed_categories_write_by_coach" on public.event_allowed_categories;

create policy "event_allowed_categories_write_by_admin"
  on public.event_allowed_categories
  for all
  to authenticated
  using (is_admin())
  with check (is_admin());
