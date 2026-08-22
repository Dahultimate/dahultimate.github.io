-- Phase 5 : événements + catégories autorisées à y participer.

create table public.events (
  id uuid primary key default gen_random_uuid(),
  event_type_id uuid not null references public.event_reference_items (id),
  category text not null check (category in ('Mixte', 'Féminin', 'Open', 'Loose Mixte', 'Master')),
  format_id uuid not null references public.event_reference_items (id),
  division_id uuid not null references public.event_reference_items (id),
  location text not null,
  event_date date not null,
  organizer_id uuid not null references public.members (id),
  response_deadline date not null,
  created_at timestamptz not null default now(),
  constraint events_deadline_before_event check (response_deadline <= event_date)
);

-- Catégories (sexe + tranche d'âge) autorisées à participer à un événement.
create table public.event_allowed_categories (
  event_id uuid not null references public.events (id) on delete cascade,
  sex text not null check (sex in ('F', 'M')),
  age_category_id uuid not null references public.age_categories (id),
  primary key (event_id, sex, age_category_id)
);

-- Garde-fou : event_type_id/format_id/division_id doivent référencer un
-- event_reference_items du bon "kind" (une division ne doit pas pouvoir
-- être utilisée comme format, etc.).
create or replace function public.check_event_reference_kinds()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from event_reference_items where id = new.event_type_id and kind = 'event_type') then
    raise exception 'event_type_id ne référence pas un event_reference_items de kind=event_type';
  end if;
  if not exists (select 1 from event_reference_items where id = new.format_id and kind = 'format') then
    raise exception 'format_id ne référence pas un event_reference_items de kind=format';
  end if;
  if not exists (select 1 from event_reference_items where id = new.division_id and kind = 'division') then
    raise exception 'division_id ne référence pas un event_reference_items de kind=division';
  end if;
  return new;
end;
$$;

create trigger events_check_reference_kinds
  before insert or update on public.events
  for each row execute function public.check_event_reference_kinds();

alter table public.events enable row level security;
alter table public.event_allowed_categories enable row level security;

-- Lecture ouverte à tout membre authentifié (listes/détail phase 6).
create policy "events_select_all"
  on public.events for select to authenticated using (true);

create policy "event_allowed_categories_select_all"
  on public.event_allowed_categories for select to authenticated using (true);

-- Création/modification réservée aux admins et coachs (is_coach() couvre aussi les admins).
create policy "events_write_by_coach"
  on public.events for all to authenticated
  using (is_coach())
  with check (is_coach());

create policy "event_allowed_categories_write_by_coach"
  on public.event_allowed_categories for all to authenticated
  using (is_coach())
  with check (is_coach());

-- Annuaire minimal (nom, sexe, année de naissance), lisible par tout
-- membre authentifié : nécessaire pour choisir le porteur de projet d'un
-- événement (phase 5) et pour afficher les participants (phase 6/7), sans
-- exposer email/n° de licence/droits comme le fait la table members
-- complète (réservée à l'admin).
create or replace function public.member_directory()
returns table (id uuid, first_name text, last_name text, sex text, birth_year integer)
language sql
stable
security definer
set search_path = public
as $$
  select id, first_name, last_name, sex, birth_year from public.members where active;
$$;

grant execute on function public.member_directory() to authenticated;
