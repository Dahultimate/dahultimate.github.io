-- Le lieu devient optionnel (affiché "Lieu inconnu" côté frontend si vide).
alter table public.events alter column location drop not null;

-- Les événements ont désormais une date de début (renommage de
-- l'ancienne event_date, la contrainte events_deadline_before_event et le
-- trigger suivent automatiquement le renommage) et une date de fin.
alter table public.events rename column event_date to start_date;

alter table public.events add column end_date date;
update public.events set end_date = start_date where end_date is null;
alter table public.events alter column end_date set not null;

alter table public.events add constraint events_end_after_start check (end_date >= start_date);

-- "La date butoir doit être avant la date de début" : passage de <= à <
-- strict (auparavant la butoir pouvait tomber le jour même de l'événement).
alter table public.events drop constraint events_deadline_before_event;
alter table public.events add constraint events_deadline_before_start check (response_deadline < start_date);
