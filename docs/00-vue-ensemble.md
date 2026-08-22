# DahultiApp — Vue d'ensemble du projet

Application de gestion des disponibilités pour les membres de l'association Dahultimate, accessible sur `https://www.dahultimate.fr/app`, séparée du site vitrine statique existant.

## Architecture

- **Frontend** : TypeScript strict + [Lit](https://lit.dev) (Web Components), buildé avec [Vite](https://vitejs.dev), déployé sur GitHub Pages sous le chemin `/app`.
- **Backend** : [Supabase](https://supabase.com) (plan gratuit) — Auth (email/mot de passe), base PostgreSQL avec Row Level Security, Edge Functions pour les opérations nécessitant la clé `service_role` (création de compte membre, réinitialisation de mot de passe).
- **Aucun lien** vers `/app` n'est ajouté sur le site vitrine (`index.html`) — l'accès se fait uniquement en connaissant l'URL directe.

Le dossier `webapp/` contient le code source du frontend (jamais publié tel quel). Le dossier `supabase/` contient les migrations SQL et les Edge Functions. Le pipeline CI (`.github/workflows/deploy.yaml`) construit `webapp/`, assemble un dossier `publish/` combinant le site statique existant + le build de l'app sous `app/`, puis déploie ce dossier sur la branche `gh-pages`.

## Méthode de travail

Chaque phase est testée **en local** (`npm run dev` dans `webapp/`, servi sur `http://localhost:5173/app/`). Le déploiement réel sur `https://www.dahultimate.fr/app` (configuration des variables GitHub, `git push` sur `master`) n'interviendra qu'à la toute fin du projet, une fois toutes les phases validées.

**Note environnement (Windows)** : toujours lancer `npm install` / `npm run ...` depuis **PowerShell**, pas depuis Git Bash/WSL — sur ce poste, un `npm install` lancé depuis Git Bash ne génère pas les raccourcis `.cmd`/`.ps1` nécessaires à Windows, ce qui casse `npm run` avec une erreur `'tsc'/'vite' n'est pas reconnu`.

## Rôles

Un membre est stocké dans la table `members`, toujours "joueur" de base, avec deux droits additifs :
- `is_coach` : peut créer/modifier des événements.
- `is_admin` : peut gérer les membres, les référentiels (types d'événement, formats, divisions, catégories d'âge) et réinitialiser les mots de passe.

## Suivi des phases

| Phase | Sujet | Statut |
|---|---|---|
| 0 | Socle technique & pipeline de déploiement | ✅ Validé |
| 1 | Authentification & connexion | ✅ Validé |
| 2 | Gestion des membres (admin) | 🔧 En cours |
| 3 | Catégories d'âge | ⏳ À venir |
| 4 | Référentiels d'événements (admin) | ⏳ À venir |
| 5 | Création & modification d'événements | ⏳ À venir |
| 6 | Consultation des événements | ⏳ À venir |
| 7 | Déclaration de disponibilité | ⏳ À venir |
| 8 | Finitions ergonomie, sécurité et documentation finale | ⏳ À venir |

Chaque phase est détaillée dans son propre fichier `docs/NN-nom.md`, avec pour chacune :
- **Objectif** : ce que la fonctionnalité apporte.
- **Actions réalisées (Claude)** : ce qui a été codé/configuré automatiquement.
- **Actions manuelles à réaliser (vous)** : ce que vous devez faire vous-même (comptes, secrets, exécution de migrations, déploiement d'Edge Functions...).
- **Comment tester** : procédure pour valider la fonctionnalité avant de passer à la phase suivante.

Le plan complet et les décisions d'architecture sont détaillés dans chaque doc de phase au fur et à mesure de leur avancement.
