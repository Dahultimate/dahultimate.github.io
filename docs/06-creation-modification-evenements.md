# Phase 5 — Création & modification d'événements

## Objectif

Permettre aux admins de créer et modifier un événement (type, catégorie, format, division, lieu, date, porteur de projet, date butoir, catégories autorisées à participer).

> **Changement par rapport à l'énoncé initial** : la spec prévoyait que les coachs puissent aussi créer/modifier des événements. Décision prise en cours de développement (après la phase 6) : cette action est réservée aux **admins uniquement**. Voir `supabase/migrations/0007_events_edit_admin_only.sql`. Les coachs conservent tous les autres droits prévus par la spec (consultation, déclaration de disponibilité).
>
> **Changement (après la phase 8)**, voir `supabase/migrations/0009_events_dates_location.sql` :
> - Le **lieu devient facultatif** (colonne `location` nullable) ; l'application affiche "Lieu inconnu" quand il est vide (`domain/event.ts::displayLocation()`).
> - `event_date` est remplacé par un couple **`start_date`/`end_date`** (date de fin toujours ≥ date de début).
> - La contrainte sur la date butoir passe de "≤ date de l'événement" à **strictement avant la date de début** (`response_deadline < start_date`).
> - Le formulaire (`event-form.ts`) remplace les cases à cocher des catégories autorisées par des **boutons/puces tactiles**, avec un bouton "Toutes les catégories" (bascule tout sélectionner / tout désélectionner).
>
> **Changement (nom d'événement)**, voir `supabase/migrations/0010_events_name.sql` : les événements ont désormais un **nom** (colonne `name`, obligatoire). Il est pré-rempli automatiquement (`domain/event.ts::computeDefaultEventName()`, testé) par la concaténation type + catégorie + format + division dès que l'un de ces champs change dans le formulaire — ex. "Championnat Open Indoor N3" — mais reste librement modifiable : dès que l'utilisateur tape dans le champ "Nom", le pré-remplissage automatique s'arrête pour cet événement. C'est ce nom qui est maintenant affiché comme titre dans le détail, les listes et l'accueil (le type/la catégorie restent visibles en sous-titre dans le détail).
>
> **Changement (porteur de projet facultatif)**, voir `supabase/migrations/0011_events_organizer_optional.sql` : `organizer_id` est désormais nullable. Le formulaire propose une option "— Aucun —" (plus de sélection automatique du premier membre par défaut) et le détail affiche "Non renseigné" quand aucun porteur n'est choisi (`domain/event.ts::displayOrganizerName()`, testé).

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0005_events.sql`)
- Table `public.events` : référence `event_type_id`/`format_id`/`division_id` vers `event_reference_items` (phase 4), `category` en liste fixe (Mixte/Féminin/Open/Loose Mixte/Master — non éditable par l'admin, cf. décision de la phase 4), lieu, date, `organizer_id` (FK vers `members`), date butoir. Contrainte `events_deadline_before_event` : la date butoir ne peut pas être après la date de l'événement.
- Table `public.event_allowed_categories` : couples (sexe, tranche d'âge) autorisés à participer, en relation avec `age_categories` (phase 3).
- **Trigger `events_check_reference_kinds`** : vérifie que `event_type_id` référence bien un item de `kind = 'event_type'` (et pareil pour format/division) — empêche par exemple qu'une division soit utilisée à la place d'un format, ce qu'une simple clé étrangère ne peut pas garantir puisque les trois pointent vers la même table.
- RLS : lecture ouverte à tout membre authentifié (nécessaire pour les listes/détail de la phase 6), écriture réservée aux admins/coachs (`is_coach()`, qui couvre aussi les admins).
- **Nouvelle RPC `member_directory()`** : annuaire minimal (nom, sexe, année de naissance) lisible par **tout** membre authentifié, sans exposer email/n° de licence/droits comme le fait la table `members` complète (réservée à l'admin). Nécessaire ici pour le sélecteur "porteur de projet" (un coach non-admin doit pouvoir choisir n'importe quel membre), et réutilisée par la phase 6/7 pour afficher les listes de participants.

### Frontend (`webapp/src/`)
- `domain/event.ts` : types `SportEvent`, `EventInput`, `EVENT_CATEGORIES` (liste fixe).
- `domain/member.ts` : ajout de `MemberDirectoryEntry`.
- `services/member-directory.repository.ts`, `services/events.repository.ts` : ce dernier gère l'écriture en deux temps (la table `events` et `event_allowed_categories` sont deux tables distinctes) — si l'insertion des catégories autorisées échoue après la création de l'événement, celui-ci est automatiquement supprimé pour éviter un événement orphelin sans catégories.
- `components/event-form.ts` : formulaire complet (tous les champs de la spec), avec les catégories autorisées présentées en cases à cocher regroupées par sexe.
- `components/events-list.ts` : **liste plate provisoire**, juste pour pouvoir tester la création/modification dès maintenant. Elle sera remplacée en phase 6 par les deux listes triées ("Événements sportifs" / "Tournois et Hats") avec détail et compteurs.
- `components/events-view.ts` : bascule liste/formulaire.
- `components/app-shell.ts` : nouvel onglet **"Événements"**, visible par les **admins et les coachs** (contrairement aux onglets précédents, réservés aux admins) — la navigation utilise maintenant une fonction `visible(member)` par onglet plutôt qu'un simple booléen `adminOnly`.

### Validation locale
`npm run test` (30 tests) et `npm run build` passent sans erreur.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : SQL Editor Supabase → coller `supabase/migrations/0005_events.sql` → exécuter.
   - Aucune nouvelle Edge Function (uniquement des tables/RLS/RPC, pas d'opération nécessitant `service_role`).

## Comment tester (en local, `npm run dev`)

1. Se connecter en **coach** (pas admin) : vérifier que l'onglet **"Événements"** est visible, mais pas "Membres"/"Catégories d'âge"/"Référentiels événements".
2. Cliquer **"+ Créer un événement"**, remplir le formulaire (type, catégorie, format, division, lieu, date, porteur de projet, date butoir, au moins une catégorie autorisée), valider.
3. Vérifier que l'événement apparaît dans la liste avec les bonnes informations.
4. Cliquer **"Modifier"**, changer plusieurs champs (y compris les catégories autorisées), enregistrer : vérifier que les changements sont bien pris en compte.
5. Essayer de mettre une date butoir **après** la date de l'événement : vérifier qu'une erreur bloque l'enregistrement.
6. Essayer de décocher toutes les catégories autorisées : vérifier qu'une erreur bloque l'enregistrement.
7. Se connecter avec un compte joueur simple (ni admin, ni coach) : vérifier que l'onglet "Événements" n'apparaît pas.

Une fois ces points validés, on pourra enchaîner sur la **Phase 6 — Consultation des événements** (les deux listes triées, le détail avec compteurs de présence).
