# Phase 1 — Authentification & connexion

## Objectif

Permettre à un membre de se connecter avec son email/mot de passe, l'obliger à définir un mot de passe personnel lors de sa toute première connexion, enregistrer sa date de dernière connexion, et conserver la session pour ne pas avoir à se reconnecter pendant 30 jours. Cette phase pose aussi la table `members` et les fondations RLS réutilisées par toutes les phases suivantes.

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0001_members.sql`)
- Table `public.members` liée à `auth.users` (son `id` **est** l'id du compte Supabase Auth) : nom, prénom, email, sexe, année de naissance, n° de licence, type de licence, `is_admin`, `is_coach`, `must_change_password`, `active`, `last_login_at`.
- RLS activé : un membre authentifié ne peut lire que **sa propre** fiche (`members_select_own`). La lecture de l'annuaire complet par les admins/coachs sera ajoutée en phase 2/6.
- Fonctions utilitaires `is_admin()` / `is_coach()` (un admin a aussi les droits coach), réutilisées par les policies des prochaines phases.
- Deux RPC dédiées, appelables uniquement pour sa propre ligne (`auth.uid()`, aucun paramètre) : `mark_last_login()` et `complete_password_change()`. Elles évitent d'ouvrir un `UPDATE` générique sur `members` depuis le frontend — un membre ne doit jamais pouvoir modifier `is_admin` ou la fiche d'un autre membre.

### Edge Function `create-member-account` (`supabase/functions/create-member-account/`)
Crée à la fois le compte Supabase Auth (email + mot de passe = numéro de licence, `email_confirm: true`) **et** la fiche `members` associée, avec validation stricte des champs reçus. Deux modes :
- **Bootstrap** : si la table `members` est vide, la création est acceptée sans vérification d'admin et le compte créé est automatiquement administrateur. C'est le seul moyen d'amorcer le tout premier compte (chicken-and-egg : pas encore d'admin pour en créer un autre).
- **Normal** : sinon, l'appelant doit être authentifié et être admin (vérifié côté fonction avec la clé `service_role`, qui ne quitte jamais l'environnement Supabase). Cette même fonction sera réutilisée telle quelle par le formulaire d'ajout de membre de la phase 2.
- En cas d'échec de création de la fiche `members`, le compte Auth fraîchement créé est automatiquement supprimé (pas de compte orphelin).

### Frontend (`webapp/src/`)
- `domain/member.ts` : type métier `Member`.
- `services/members.repository.ts` : lecture de sa propre fiche (`fetchOwnMember`), conversion snake_case (base) → camelCase (app).
- `services/auth.service.ts` : `signIn`, `signOut`, `changePassword`, et `initAuthListener()` qui synchronise l'état de connexion Supabase avec l'état applicatif.
- `state/session-store.ts` : petit store observable (chargement / déconnecté / connecté), découplé de Lit — c'est la seule source de vérité sur la session, consultée par les composants.
- `components/login-view.ts` : formulaire email/mot de passe.
- `components/change-password-view.ts` : écran obligatoire de choix du mot de passe (8 caractères minimum, confirmation), affiché tant que `must_change_password` est vrai.
- `components/app-shell.ts` : écran une fois connecté (nom du membre + déconnexion), sera enrichi phase après phase.
- `components/app-root.ts` : bascule automatiquement entre ces trois écrans selon l'état de session ; plus aucun accès direct à Supabase depuis les composants (tout passe par `services/`).
- Le badge "connexion à Supabase" de la phase 0 (son rôle était temporaire) a été retiré au profit du véritable écran de connexion.

### Validation locale
`tsc --noEmit` et `npm run build` passent sans erreur.

**Point d'environnement corrigé en cours de route** : la toute première installation des dépendances (`npm install`) avait été lancée depuis un terminal Git Bash, qui ne génère pas les raccourcis `.cmd`/`.ps1` Windows pour les commandes `npm run ...` — d'où l'erreur `'tsc'/'vite' n'est pas reconnu`. Une réinstallation propre depuis PowerShell a résolu le problème. Si cette erreur réapparaît un jour : supprimer `webapp/node_modules` et relancer `npm install` **depuis PowerShell**, jamais depuis Git Bash/WSL.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : dans le dashboard Supabase, aller dans **SQL Editor**, coller le contenu de `supabase/migrations/0001_members.sql`, exécuter.
2. **Installer la Supabase CLI** (si pas déjà fait) puis, depuis la racine du dépôt :
   ```
   npx supabase login
   npx supabase init
   npx supabase link --project-ref <votre-project-ref>
   npx supabase functions deploy create-member-account
   ```
   Le `<project-ref>` est visible dans l'URL du dashboard Supabase ou dans **Project Settings > General**.
   (`SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont automatiquement disponibles dans l'environnement de la fonction — rien à configurer manuellement pour ces deux valeurs.)
3. **Créer le tout premier compte (administrateur)** : appeler la fonction une fois, par exemple avec `curl` (remplacez les valeurs, notamment par votre propre email) :
   ```bash
   curl -X POST "https://<votre-project-ref>.supabase.co/functions/v1/create-member-account" \
     -H "apikey: <votre-clé-anon>" \
     -H "Authorization: Bearer <votre-clé-anon>" \
     -H "Content-Type: application/json" \
     -d '{
       "lastName": "Votre nom",
       "firstName": "Votre prénom",
       "email": "vous@example.com",
       "sex": "M",
       "birthYear": 1990,
       "licenseNumber": "VOTRE-NUM-LICENCE",
       "licenseType": "competition"
     }'
   ```
   Votre mot de passe initial sera votre numéro de licence (à changer à la première connexion, comme pour tout membre).
4. **Vérifier la durée de session** : dans le dashboard Supabase, **Authentication > Sessions**, s'assurer qu'aucune expiration de session/inactivité inférieure à 30 jours n'est activée (désactivée par défaut, ce qui convient).

## Comment tester (en local, `npm run dev`)

1. `cd webapp && npm run dev`, ouvrir `http://localhost:5173/app/`.
2. Se connecter avec l'email et le numéro de licence (mot de passe initial) du compte créé à l'étape 3 ci-dessus.
3. Vérifier que l'écran **"Choisissez votre mot de passe"** apparaît automatiquement (première connexion).
4. Définir un nouveau mot de passe (8 caractères minimum) : vérifier qu'on arrive ensuite sur l'écran connecté affichant votre nom.
5. Cliquer sur **Déconnexion**, vérifier le retour à l'écran de connexion.
6. Se reconnecter avec le **nouveau** mot de passe : vérifier qu'on arrive directement sur l'écran connecté (plus d'écran de changement de mot de passe).
7. Fermer l'onglet/le navigateur puis rouvrir `http://localhost:5173/app/` : la session doit rester active sans redemander de connexion.
8. (Optionnel) Dans le dashboard Supabase, table `members`, vérifier que `last_login_at` a bien été mis à jour.

Une fois ces points validés, on pourra enchaîner sur la **Phase 2 — Gestion des membres (admin)**.
