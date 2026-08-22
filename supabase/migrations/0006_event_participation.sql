-- Phase 6 : consultation des événements.

-- Classer les types d'événement en "Événements sportifs" / "Tournois et
-- Hats" par libellé ("Championnat", "Tournoi"...) serait fragile : l'admin
-- peut renommer/ajouter/supprimer ces types (phase 4). On ajoute donc une
-- colonne pilotée par l'admin plutôt qu'un matching sur le texte.
alter table public.event_reference_items
  add column event_family text check (event_family in ('sportif', 'tournoi'));

update public.event_reference_items set event_family = 'sportif'
  where kind = 'event_type' and label in ('Championnat', 'Coupe', 'Winter League');
update public.event_reference_items set event_family = 'tournoi'
  where kind = 'event_type' and label in ('Tournoi', 'Hat');

-- Table des réponses de disponibilité. Le schéma est nécessaire dès cette
-- phase pour calculer les listes/compteurs de la page détail ; l'écriture
-- (boutons Disponible/Indisponible/Incertain, contrainte de date butoir)
-- arrive en phase 7 — seule la lecture est ouverte ici.
create table public.availabilities (
  event_id uuid not null references public.events (id) on delete cascade,
  member_id uuid not null references public.members (id) on delete cascade,
  status text not null check (status in ('available', 'unavailable', 'uncertain')),
  responded_at timestamptz not null default now(),
  primary key (event_id, member_id)
);

alter table public.availabilities enable row level security;

-- Tout membre authentifié peut voir qui a répondu quoi (listes/compteurs
-- de la page détail, visibles par joueurs/coachs/admins).
create policy "availabilities_select_all"
  on public.availabilities
  for select
  to authenticated
  using (true);
