# Sessions de préparation physique & roulement (ajouté après la doc 11)

## Objectif

Les admins peuvent composer des **sessions** de préparation physique (objectif, type de prépa, séries/durées, jusqu'à 8 exercices + un finisher, tout facultatif) et définir un **roulement hebdomadaire** (ex. Semaine 1 → session X, Semaine 2 → Y, Semaine 3 → Z, puis ça recommence). La page "Préparation physique" affiche en premier la session de la semaine en cours ; chaque exercice qui la compose est cliquable pour voir son détail (consignes, vidéo). La liste complète des exercices reste accessible via un bouton.

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0014_physical_sessions.sql`)
- Table `physical_sessions` : `objective` réutilise la même liste fixe de types que les exercices (un seul, contrairement aux exercices qui en acceptent plusieurs — l'énoncé dit "l'objectif", singulier), `prep_type` limité à Tabata/Cardio, 4 champs de durées/séries, 8 colonnes `exercise_N_id` + `finisher_id` (FK vers `physical_exercises`, `on delete set null` : supprimer un exercice ne supprime pas la session, juste ce créneau). Un champ **`name`** a été ajouté bien que non listé dans la demande : indispensable pour identifier une session dans la liste admin et dans le roulement (l'énoncé énumère les champs "facultatifs" de la session, mais sans nom il serait impossible de la sélectionner/lister).
- Table `physical_session_rotation` : une seule ligne (singleton), un tableau ordonné d'ids de session (`session_ids uuid[]`) qui représente le cycle rejoué en boucle.
- RLS : lecture ouverte à tous, écriture réservée aux admins pour les deux tables.

### Numéro de semaine et sélection de la session courante
- `domain/iso-week.ts` (+ tests) : `getIsoWeekNumber()` (numéro de semaine ISO-8601, la même numérotation "Semaine NN" que les calendriers courants) et `currentRotationSessionId()` qui applique `(numéro de semaine - 1) mod longueur du roulement` pour retrouver la session de la semaine courante — en ignorant silencieusement les ids de session qui ne existent plus (session supprimée entre-temps), pour ne pas casser tout le roulement.
- Ce choix (semaine ISO plutôt qu'une date de démarrage à saisir par l'admin) évite toute configuration : le roulement avance tout seul, chaque semaine civile.

### Frontend (`webapp/src/`)
- `domain/physical-session.ts` : modèle de session (8 créneaux d'exercices sous forme de tableau facultatif, en plus du finisher).
- `services/physical-sessions.repository.ts`, `services/physical-session-rotation.repository.ts` : CRUD classique + lecture/écriture du singleton de roulement.
- `components/physical-exercise-video.ts` : composant d'intégration vidéo extrait de la phase précédente pour être réutilisé à deux endroits (liste des exercices ET détail d'un exercice cliqué depuis une session).
- `components/physical-exercise-detail.ts` : détail d'un exercice (nom, types, consignes, vidéo) avec bouton retour — nouvel écran, atteint en cliquant un exercice dans la session de la semaine.
- `components/physical-session-form.ts` : formulaire de session (tous les champs facultatifs sauf le nom), avec un sélecteur par créneau d'exercice (liste déroulante "— Aucun —" + tous les exercices).
- `components/physical-sessions-list.ts` : liste admin des sessions (créer/modifier/supprimer).
- `components/physical-session-rotation-editor.ts` : éditeur du roulement — ajouter une session à la suite, la retirer, la déplacer (↑/↓), enregistrer.
- `components/current-physical-session.ts` : calcule et affiche la session de la semaine courante (numéro de semaine, objectif/type/durées, liste des créneaux avec bouton cliquable — désactivé si le créneau est vide).
- `components/physical-prep-view.ts` : nouvel écran conteneur pour l'onglet "Préparation physique", avec une petite barre d'outils : **"Session de la semaine"** (par défaut), **"Tous les exercices"** (l'ancien écran, inchangé), et pour les admins **"Gérer les sessions"** / **"Gérer le roulement"**. Remplace le branchement direct de `physical-exercises-view` dans `app-shell.ts`.

### Point technique
Même piège que pour `event-reference-list` (phase 8) : la propriété `title` du composant vidéo entrait en conflit avec `HTMLElement.title` (info-bulle native). Renommée en `videoTitle`.

### Validation locale
`npm run test` (65 tests) et `npm run build` passent sans erreur.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : SQL Editor Supabase → coller `supabase/migrations/0014_physical_sessions.sql` → exécuter.
   - Aucune nouvelle Edge Function.

## Comment tester (en local, `npm run dev`)

1. Se connecter en admin, ouvrir "Préparation physique" → "Gérer les sessions" → créer 2-3 sessions de test (nom + quelques exercices choisis parmi ceux importés précédemment).
2. "Gérer le roulement" : ajouter ces sessions dans un ordre donné, réordonner avec ↑/↓, enregistrer.
3. Retour sur "Session de la semaine" : vérifier qu'une session s'affiche (celle correspondant à la semaine ISO courante modulo la longueur du roulement), avec ses infos et la liste de ses exercices.
4. Cliquer sur un exercice de la session : vérifier l'ouverture du détail (consignes + vidéo), et que le bouton "Retour" revient à la session.
5. Cliquer "Tous les exercices" : vérifier que l'ancien écran (liste complète, CRUD admin) fonctionne comme avant.
6. Se connecter avec un compte non-admin : vérifier que "Session de la semaine" et "Tous les exercices" sont visibles, mais pas "Gérer les sessions"/"Gérer le roulement".
7. (Optionnel) Pour vérifier le changement de semaine sans attendre : modifier temporairement l'ordre du roulement et recharger — la session affichée doit changer en cohérence avec la nouvelle position dans le cycle.
