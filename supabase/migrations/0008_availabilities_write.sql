-- Phase 7 : un membre peut déclarer/modifier sa propre disponibilité tant
-- que la date du jour n'a pas dépassé la date butoir de l'événement.
-- Contrôle fait ici en base (en plus du contrôle côté UI) pour empêcher
-- un appel direct à l'API après la date butoir.

create policy "availabilities_insert_own_before_deadline"
  on public.availabilities
  for insert
  to authenticated
  with check (
    member_id = auth.uid()
    and exists (
      select 1 from public.events e
      where e.id = event_id and current_date <= e.response_deadline
    )
  );

create policy "availabilities_update_own_before_deadline"
  on public.availabilities
  for update
  to authenticated
  using (member_id = auth.uid())
  with check (
    member_id = auth.uid()
    and exists (
      select 1 from public.events e
      where e.id = event_id and current_date <= e.response_deadline
    )
  );
