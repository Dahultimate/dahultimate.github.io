# Préparation physique (fonctionnalité ajoutée après la phase 8)

## Objectif

Nouvel onglet "Préparation physique" : les admins peuvent y renseigner des exercices (nom, types, consignes, vidéo de démonstration), visibles par tous les membres.

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0012_physical_exercises.sql`)
- Table `public.physical_exercises` : nom (obligatoire), `types` (tableau de texte contraint aux 9 valeurs fixes de la spec — Course, Jambes, Abdos, Dos, Bras, Cardio, Mobilité / Plio, Disque, Proprioception — pas besoin d'une table de référence comme pour les événements puisque cette liste n'est pas éditable par l'admin), consignes et lien vidéo (tous deux facultatifs).
- RLS : lecture ouverte à tout membre authentifié, écriture réservée aux admins.

### Frontend (`webapp/src/`)
- `domain/physical-exercise.ts` (+ tests) : types fixes, et surtout `extractYouTubeVideoId()` — fonction pure qui reconnaît les URLs YouTube sous toutes leurs formes courantes (`watch?v=`, `youtu.be/`, `embed/`, `shorts/`, avec ou sans paramètres additionnels) et retourne l'identifiant de vidéo, ou `null` si l'URL n'est pas reconnue.
- `services/physical-exercises.repository.ts` : CRUD classique.
- `components/physical-exercise-form.ts` : formulaire avec les types en boutons/puces tactiles (même pattern que les catégories d'événement, phase 8).
- `components/physical-exercises-view.ts` : liste (visible par tous) + création/modification/suppression (admin uniquement, actions masquées pour les autres). Pour chaque exercice avec un lien vidéo :
  - si `extractYouTubeVideoId()` reconnaît l'URL, la vidéo est **intégrée directement** dans la page via une `<iframe>` (mode `youtube-nocookie.com`, respectueux de la vie privée) au format 16:9 responsive ;
  - sinon, un simple **lien cliquable** "Voir la vidéo de démonstration" est affiché, conformément à la demande.
- `components/app-shell.ts` : nouvel onglet "Préparation physique" dans le menu, visible par tous.

### Note de conception
L'énoncé dit "chaque exercice **peut avoir**..." pour l'ensemble des champs (types, nom, consignes, vidéo), ce qui suggère que tout est facultatif. Par pragmatisme, seul le **nom** a été rendu obligatoire (impossible d'identifier/lister un exercice sans nom) ; types, consignes et vidéo restent tous facultatifs.

### Validation locale
`npm run test` (57 tests) et `npm run build` passent sans erreur.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : SQL Editor Supabase → coller `supabase/migrations/0012_physical_exercises.sql` → exécuter.
   - Aucune nouvelle Edge Function.

## Comment tester (en local, `npm run dev`)

1. Se connecter en admin, ouvrir l'onglet **"Préparation physique"**, cliquer "+ Ajouter un exercice".
2. Renseigner un nom, sélectionner plusieurs types (vérifier qu'ils peuvent être combinés librement), des consignes, et coller un lien YouTube classique (`https://www.youtube.com/watch?v=...`) : vérifier que la vidéo s'affiche intégrée dans la page après enregistrement.
3. Modifier cet exercice avec un lien non-YouTube (ex. un lien Vimeo ou un lien quelconque) : vérifier qu'un simple lien cliquable "Voir la vidéo de démonstration" s'affiche à la place de l'intégration.
4. Créer un exercice sans vidéo ni consignes (juste un nom) : vérifier qu'il s'affiche correctement sans section vidéo.
5. Se connecter avec un compte joueur/coach non-admin : vérifier que l'onglet est visible, la liste consultable, mais sans bouton "Ajouter"/"Modifier"/"Supprimer".
