# Phase 0 — Socle technique & pipeline de déploiement

## Objectif

Mettre en place le squelette de l'application (`webapp/`), la connexion (encore vide) à Supabase, et faire en sorte que `https://www.dahultimate.fr/app` soit servi automatiquement par le pipeline de déploiement existant, sans aucun lien depuis la page d'accueil du site vitrine.

## Actions réalisées (Claude)

- **Projet frontend** `webapp/` : Vite + TypeScript strict + Lit.
  - `webapp/tsconfig.json` : mode `strict` complet (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noUnusedLocals`, etc.).
  - `webapp/vite.config.ts` : `base: "/app/"` pour que l'app fonctionne correctement une fois déployée sous ce sous-chemin.
  - Architecture en couches, prête à accueillir les prochaines phases :
    - `src/components/` — Web Components Lit (UI pure, pas d'accès direct à Supabase).
    - `src/services/` — accès à Supabase (`supabase-client.ts`, `connection.service.ts`).
    - `src/domain/` — types et objets métier partagés (`connection-status.ts`).
  - `src/components/app-root.ts` : écran d'accueil minimal de l'app, qui vérifie la connexion au projet Supabase configuré et l'affiche (checking / connecté / erreur), sans dépendre d'une table applicative (aucune table n'existe encore).
- **Sécurité des dépendances** : `vite` fixé en version 8 (la ligne 5.x embarque une version d'`esbuild` avec une faille connue sur le serveur de dev — `npm audit` est propre sur ce projet).
- **Pipeline CI** (`.github/workflows/deploy.yaml`) étendu :
  1. installe Node.js 22 et les dépendances de `webapp/` (`npm ci`),
  2. build l'app (`npm run build`, avec les variables `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` injectées depuis les variables de repository GitHub),
  3. assemble un dossier `publish/` contenant les fichiers du site vitrine existant (`index.html`, `style.css`, `logo.jpg`, `favicon.ico`, `CNAME`, `.nojekyll`) **+** le build de l'app copié dans `publish/app/`,
  4. déploie `publish/` sur la branche `gh-pages` (comme avant, même action `peaceiris/actions-gh-pages`).
  - Le dossier source `webapp/` (code, `node_modules`, etc.) n'est **jamais** publié : seul son build (`webapp/dist`) atterrit dans `app/` sur `gh-pages`.
- **Confidentialité** : `webapp/index.html` inclut `<meta name="robots" content="noindex, nofollow">` pour ne pas faire indexer l'app par les moteurs de recherche. Aucun lien vers `/app` n'a été ajouté sur `index.html` (page d'accueil du site vitrine) — l'accès se fait uniquement via l'URL directe.
- **Validation locale** : `tsc --noEmit` et `vite build` passent sans erreur (`npm run build`), `npm audit` ne remonte aucune vulnérabilité, et le serveur de développement (`vite dev`) sert correctement `/app/` avec tous les modules TypeScript/Lit transformés sans erreur.
- `.gitignore` ajouté à la racine (`node_modules/`, `webapp/dist/`, `publish/`, fichiers `*.local`).
- `webapp/.env.example` : documente les deux variables d'environnement attendues.

> **Méthode de travail à partir de cette phase** : chaque fonctionnalité est testée **en local** (`npm run dev`), pas sur GitHub Pages. Le déploiement réel (configuration des variables GitHub, `git push` sur `master`) n'interviendra qu'à la toute fin du projet, une fois toutes les phases validées. Le pipeline CI décrit ci-dessous est donc déjà en place mais ne sera exercé qu'en dernier lieu.

## Actions manuelles à réaliser (vous)

1. **Créer le projet Supabase** (gratuit) :
   - Aller sur [supabase.com](https://supabase.com), créer un compte si besoin.
   - Créer un nouveau projet (choisir une région proche, ex. Europe, et définir un mot de passe de base de données — à conserver précieusement, il servira pour les accès directs à la base plus tard).
   - Une fois le projet créé, aller dans **Project Settings > API** et noter :
     - `Project URL` (ex. `https://xxxxxxxxxxxx.supabase.co`)
     - `anon public` key (⚠️ pas la `service_role` key, qui ne doit jamais être utilisée côté frontend).
2. **Configurer l'environnement local** : dans `webapp/`, copier `.env.example` en `.env.local` et y renseigner les deux valeurs ci-dessus. Puis :
   ```
   cd webapp
   npm install
   npm run dev
   ```
   L'app sera servie sur `http://localhost:5173/app/`.
3. **À ne faire que plus tard, juste avant le déploiement final** : configurer les variables de repository GitHub (`Settings > Secrets and variables > Actions > Variables` → `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) et pousser sur `master`. Non nécessaire pour l'instant.

## Comment tester

1. Lancer `npm run dev` dans `webapp/` et ouvrir `http://localhost:5173/app/` dans le navigateur.
2. La page doit afficher "DahultiApp" et un badge de statut.
3. Si `.env.local` a été correctement renseigné (étape 2 ci-dessus), le badge doit indiquer **"Connecté à Supabase ✓"**. Sinon (fichier absent ou valeurs invalides), il doit indiquer **"Connexion à Supabase impossible"** — c'est le comportement attendu tant que Supabase n'est pas configuré.

Une fois ces points validés, on pourra enchaîner sur la **Phase 1 — Authentification & connexion**. Le test sur `https://www.dahultimate.fr/app` (absence de lien depuis la page d'accueil, déploiement CI, etc.) sera fait en toute fin de projet, lors de la phase de déploiement final.
