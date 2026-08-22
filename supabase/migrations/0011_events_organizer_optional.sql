-- Le porteur de projet devient facultatif.
alter table public.events alter column organizer_id drop not null;
