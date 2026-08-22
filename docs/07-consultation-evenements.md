# Phase 6 — Consultation des événements

## Objectif

Permettre à tout membre (joueur, coach, admin) de consulter les événements : deux listes triées par date ("Événements sportifs" / "Tournois et Hats"), puis un détail complet avec les listes de joueurs par statut et les compteurs de présence.

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0006_event_participation.sql`)
- **Colonne `event_family`** ajoutée à `event_reference_items` (valeurs `sportif`/`tournoi`, pertinente uniquement pour `kind = 'event_type'`). Classer les événements par libellé texte ("Championnat" → sportif, etc.) aurait été fragile puisque l'admin peut renommer ces types (phase 4) : c'est maintenant un champ piloté par l'admin, pré-rempli pour les 5 types de la spec.
- **Table `public.availabilities`** (event_id, member_id, statut, date de réponse) : le schéma est introduit maintenant car le détail d'un événement a besoin de savoir qui a répondu quoi pour ses listes/compteurs — mais **seule la lecture est ouverte à ce stade** (RLS `availabilities_select_all`). L'écriture (boutons Disponible/Indisponible/Incertain, contrainte de date butoir) arrive en phase 7.

### Frontend (`webapp/src/`)
- **`domain/event-participation.ts`** (+ tests unitaires) : fonctions pures `evaluateParticipants()` (classe chaque membre actif en disponible / indisponible / incertain / sans réponse / **non concerné**, en comparant son sexe + sa catégorie d'âge courante — recalculée via `computeAgeCategory()` de la phase 3 — aux catégories autorisées de l'événement) et `summarizeParticipants()` (calcule les 8 compteurs de la spec). Logique la plus sensible aux erreurs de la phase → couverte par des tests dédiés, comme la phase 3.
- `components/event-family-list.ts` : remplace la liste plate provisoire de la phase 5. Une liste générique paramétrée par `family` ("sportif"/"tournoi"), triée par date croissante, affichant nom/date/lieu.
- `components/event-detail.ts` : informations complètes de l'événement, compteurs, et les 4 listes de joueurs nommés (disponibles/indisponibles/incertains/sans réponse) — le nombre de "non concernés" apparaît en compteur uniquement, sans liste nominative (conforme à la spec).
- `components/events-view.ts` : réécrit pour distinguer consultation (accessible à tous) et gestion (bouton "+ Créer" et "Modifier"). *Mis à jour après coup : ces boutons ne sont désormais visibles que pour `member.isAdmin` (voir `docs/06-...md`).*
- `components/app-shell.ts` : l'onglet **"Événements"** est maintenant visible par **tout le monde** (joueurs compris), alors qu'il était réservé aux coachs/admins en phase 5 — seule la possibilité de créer/modifier reste restreinte, portée par `events-view` elle-même.
- `components/event-reference-form.ts` / `event-reference-list.ts` (phase 4, étendus) : ajout du sélecteur "Famille" (sportif / tournoi), visible uniquement pour les types d'événement.

### Validation locale
`npm run test` (34 tests) et `npm run build` passent sans erreur.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : SQL Editor Supabase → coller `supabase/migrations/0006_event_participation.sql` → exécuter.
   - Aucune nouvelle Edge Function.

## Comment tester (en local, `npm run dev`)

1. Se connecter avec un compte **joueur simple** : vérifier que l'onglet "Événements" est maintenant visible (contrairement à la phase 5), mais sans bouton "+ Créer un événement".
2. Vérifier que les événements créés en phase 5 apparaissent dans la bonne liste ("Événements sportifs" ou "Tournois et Hats") selon la famille du type choisi.
3. Ouvrir le détail d'un événement : vérifier les informations, les compteurs (tous à "sans réponse" pour l'instant, sauf les membres non concernés par les catégories autorisées) et les 4 listes.
4. Aller dans l'onglet **"Référentiels événements"** (admin), éditer un type d'événement existant pour changer sa famille (sportif ↔ tournoi) : vérifier que l'événement correspondant change de liste.
5. Créer un événement dont les catégories autorisées excluent volontairement certains membres (ex. seulement "Sénior") : vérifier qu'ils apparaissent bien dans le compteur "Non concernés" et pas dans les autres listes.
6. Vérifier que le bouton "Modifier" n'apparaît que pour un compte **admin** dans le détail (voir la note de changement en tête de `docs/06-...md` : les coachs ne créent/modifient plus les événements).

Une fois ces points validés, on pourra enchaîner sur la **Phase 7 — Déclaration de disponibilité** (les 3 boutons Disponible/Indisponible/Incertain, avec la contrainte de date butoir).
