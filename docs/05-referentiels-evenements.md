# Phase 4 — Référentiels d'événements (admin)

## Objectif

Permettre à l'admin de gérer les listes utilisées plus tard par le formulaire de création d'événement : types d'événement (Championnat, Tournoi, Hat, Coupe, Winter League), formats (Indoor, Outdoor, Beach) et divisions (N1, N2, N3, DR1, DR2, DR3).

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0004_event_reference_items.sql`)
Les trois listes ont exactement la même forme (un libellé + un ordre d'affichage) : plutôt que créer trois tables identiques, une seule table `public.event_reference_items` avec une colonne `kind` (`event_type` / `format` / `division`) et une contrainte `unique(kind, label)` pour éviter les doublons. RLS : lecture ouverte à tout membre authentifié (ces listes serviront de menus déroulants pour tout le monde en phase 5), écriture réservée aux admins. Seed des valeurs de la spec.

### Frontend (`webapp/src/`)
Composants **génériques**, paramétrés par `kind`, réutilisés pour les trois référentiels (pas de triplication) :
- `domain/event-reference.ts` : types `EventReferenceItem` / `EventReferenceKind`.
- `services/event-reference-items.repository.ts` : CRUD filtré par `kind`.
- `components/event-reference-form.ts` : formulaire libellé + ordre (création ou édition selon qu'un item est fourni).
- `components/event-reference-list.ts` : liste + formulaire pour un `kind` donné.
- `components/event-reference-admin-view.ts` : assemble les trois listes (Types d'événement / Formats / Divisions) sur un seul écran.
- `components/app-shell.ts` : la navigation admin passe à une petite liste de définitions d'onglets (`TABS`) plutôt que d'empiler des conditions répétées — nouvel onglet **"Référentiels événements"**.

### Point technique
`title` est une propriété native de `HTMLElement` (l'info-bulle au survol) : la nommer ainsi sur `event-reference-list` provoquait un conflit de type. Renommée en `heading`.

### Validation locale
`npm run test` (30 tests) et `npm run build` passent sans erreur.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : SQL Editor Supabase → coller `supabase/migrations/0004_event_reference_items.sql` → exécuter.
   - Aucune nouvelle Edge Function.

## Comment tester (en local, `npm run dev`)

1. Se connecter en admin, ouvrir l'onglet **"Référentiels événements"**.
2. Vérifier les valeurs pré-remplies : 5 types d'événement, 3 formats, 6 divisions.
3. Ajouter un type d'événement de test, le modifier, le supprimer : vérifier la mise à jour de chaque liste.
4. Essayer d'ajouter deux fois le même libellé dans la même liste (ex. "Indoor" deux fois pour les formats) : vérifier qu'une erreur est affichée (contrainte d'unicité).
5. Vérifier qu'un compte joueur/coach (non admin) ne voit pas cet onglet.

Une fois ces points validés, on pourra enchaîner sur la **Phase 5 — Création & modification d'événements**.
