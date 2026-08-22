-- Nom de l'événement : pré-rempli par le frontend (concaténation type +
-- catégorie + format + division, ex. "Championnat Open Indoor N3") mais
-- librement modifiable ensuite. Stocké (pas calculé) car il doit pouvoir
-- diverger de ses valeurs d'origine une fois modifié à la main.

alter table public.events add column name text;

-- Rétro-remplissage des événements déjà créés (avant cette migration),
-- pour respecter la contrainte not null ajoutée juste après.
update public.events e
set name = trim(
  coalesce((select label from public.event_reference_items where id = e.event_type_id), '') || ' ' ||
  e.category || ' ' ||
  coalesce((select label from public.event_reference_items where id = e.format_id), '') || ' ' ||
  coalesce((select label from public.event_reference_items where id = e.division_id), '')
)
where name is null;

alter table public.events alter column name set not null;
alter table public.events add constraint events_name_not_blank check (btrim(name) <> '');
