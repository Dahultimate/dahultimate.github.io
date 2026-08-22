# Guide d'administration au quotidien

Ce document n'est pas un journal de développement comme les autres (`docs/01-...` à `09-...`) : c'est la référence à laquelle revenir une fois l'application en production, pour l'administrer et la déployer.

## Gérer les membres

- **Ajouter un membre** : onglet "Membres" (admin) → "+ Ajouter un membre". Son mot de passe initial est **son numéro de licence** — à lui communiquer par un autre canal (SMS, oral...), il devra le changer à sa première connexion.
- **Modifier une fiche, activer/désactiver, changer les droits (coach/admin)** : bouton "Modifier" sur sa ligne dans la liste.
- **Réinitialiser un mot de passe** (membre qui l'a oublié) : bouton "Réinitialiser mdp" — son mot de passe redevient son numéro de licence, à lui recommuniquer ; il devra à nouveau le changer à la prochaine connexion.
- **Supprimer un compte** : bouton "Supprimer" (irréversible). Un admin ne peut pas se supprimer lui-même.

> Le tout premier compte admin a été créé "à la main" via un appel direct à l'Edge Function `create-member-account` (voir `docs/02-authentification.md`), avant que l'interface d'administration n'existe. Ce n'est plus nécessaire pour les membres suivants.

## Gérer les catégories d'âge

Onglet "Catégories" (admin). Modifier une tranche (années de naissance min/max) recalcule **immédiatement** la catégorie affichée pour tous les membres concernés — rien à faire membre par membre.

## Gérer les référentiels d'événements

Onglet "Référentiels" (admin) : types d'événement (avec leur "famille" sportif/tournoi, qui détermine dans quelle liste ils apparaissent), formats, divisions.

## Gérer les événements

Onglet "Événements" → "+ Créer un événement" (réservé aux admins). Le détail de chaque événement affiche les compteurs et listes de réponses en temps réel, ainsi qu'un bouton "Modifier".

## En cas de problème technique

- **Logs des Edge Functions** : dashboard Supabase → Edge Functions → nom de la fonction → onglet "Logs". Utile si une création de membre, une réinitialisation de mot de passe ou une suppression échoue de façon inattendue.
- **Éditer des données directement** : dashboard Supabase → Table Editor (ou SQL Editor pour des requêtes plus complexes). À utiliser avec précaution : les contraintes (format, unicité) protègent contre les erreurs de saisie, mais une modification manuelle en base contourne les vérifications faites par l'application.
- **Si `npm run` échoue sous Windows** avec une erreur du type `'tsc'/'vite' n'est pas reconnu` : toujours relancer `npm install` depuis **PowerShell** (pas Git Bash/WSL) dans `webapp/` — voir `docs/00-vue-ensemble.md`.

## Déploiement final sur GitHub Pages

Jusqu'ici, tout a été testé en local (`npm run dev`). Voici la marche à suivre pour mettre l'application en ligne sur `https://www.dahultimate.fr/app` :

1. **Configurer les variables GitHub** (une seule fois) : dans le dépôt `dahultimate.github.io` → **Settings > Secrets and variables > Actions > Variables** → ajouter :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   (mêmes valeurs que dans `webapp/.env.local`, cf. `docs/01-socle-technique.md`.)
2. **Vérifier que toutes les migrations SQL ont été exécutées** sur le projet Supabase (0001 à 0008, dans l'ordre, via le SQL Editor) et que **toutes les Edge Functions sont déployées** (`create-member-account`, `reset-member-password`, `delete-member-account`).
3. **Pousser sur `master`** (ou lancer manuellement le workflow depuis l'onglet **Actions** du dépôt GitHub) : le pipeline construit `webapp/`, assemble le site vitrine + l'app sous `/app`, et déploie sur `gh-pages`.
4. **Vérifier** :
   - `https://www.dahultimate.fr/app` affiche l'écran de connexion.
   - `https://www.dahultimate.fr/` (page d'accueil) est inchangée, sans aucun lien vers `/app`.
   - Le workflow **Deploy to GitHub Pages** est vert dans l'onglet Actions.

À partir de là, chaque nouveau `git push` sur `master` redéploie automatiquement l'application.
