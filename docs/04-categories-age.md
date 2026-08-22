# Phase 3 — Catégories d'âge

## Objectif

Permettre à l'admin de consulter et modifier les tranches d'âge (par sexe), et afficher automatiquement la catégorie de chaque membre dans l'annuaire — recalculée à la volée, jamais stockée, pour qu'une modification de borne se répercute immédiatement.

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0003_age_categories.sql`)
- Table `public.age_categories` (sexe, libellé, année de naissance min/max — nullables pour représenter "avant X inclus" / "après Y inclus", ordre d'affichage).
- RLS : lecture ouverte à tout membre authentifié (nécessaire pour afficher une catégorie n'importe où dans l'app), écriture réservée aux admins.
- Seed des 18 tranches (9 par sexe) exactement telles que définies dans la spec.

### Frontend (`webapp/src/`)
- `domain/age-category.ts` : type `AgeCategory` + fonction pure `computeAgeCategory(categories, sex, birthYear)` — c'est **cette fonction**, pas la base, qui détermine la catégorie affichée : elle est appelée à chaque affichage à partir des tranches actuellement en base.
- **Mise en place de Vitest** (tests unitaires) : `domain/age-category.test.ts` couvre les bornes exactes de la spec pour les deux sexes, plus les cas limites (catégorie introuvable, modification d'une tranche répercutée immédiatement). C'est la première brique de tests automatisés du projet — répond à l'exigence "code orienté testabilité" du cahier des charges. Commande : `npm run test` (dans `webapp/`).
- `services/age-categories.repository.ts` : lecture/écriture CRUD sur `age_categories`.
- `components/age-category-form.ts` + `components/age-categories-view.ts` : formulaire et liste (par sexe) pour ajouter/modifier/supprimer une tranche.
- `components/members-list.ts` : nouvelle colonne **"Catégorie"**, calculée via `computeAgeCategory()` à partir des tranches chargées en parallèle des membres.
- `components/app-shell.ts` : nouvel onglet **"Catégories d'âge"** (admin uniquement).

### Validation locale
`npm run test` (30 tests) et `npm run build` (typecheck strict + build) passent sans erreur.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : SQL Editor Supabase → coller `supabase/migrations/0003_age_categories.sql` → exécuter.
   - Aucune nouvelle Edge Function pour cette phase (uniquement des tables/RLS, pas d'opération nécessitant la clé `service_role`).

## Comment tester (en local, `npm run dev`)

1. (Optionnel mais recommandé) `npm run test` : vérifier que les 30 tests passent.
2. Se connecter en admin, ouvrir l'onglet **"Catégories d'âge"** : vérifier les 9 tranches par sexe (Femmes / Hommes), avec les bornes de la spec.
3. Ouvrir l'onglet **"Membres"** : vérifier que la colonne **"Catégorie"** affiche la bonne tranche pour chaque membre selon son sexe/année de naissance.
4. Retour sur "Catégories d'âge", modifier la borne d'une tranche (ex. faire passer "Sénior" (F) de 1998-2007 à 1998-2005) et enregistrer.
5. Retour sur "Membres" : vérifier que les membres nés en 2006-2007 (femmes) affichent maintenant une catégorie différente, **sans avoir eu besoin de les modifier individuellement**.
6. Ajouter une tranche de test, la supprimer : vérifier la mise à jour de la liste.

Une fois ces points validés, on pourra enchaîner sur la **Phase 4 — Référentiels d'événements (types, formats, divisions)**.
