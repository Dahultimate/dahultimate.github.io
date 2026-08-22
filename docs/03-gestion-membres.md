# Phase 2 — Gestion des membres (admin)

## Objectif

Donner aux administrateurs un espace "Membres" (visible uniquement par eux) pour ajouter un membre, consulter/modifier l'annuaire, activer/désactiver un compte, réinitialiser un mot de passe, attribuer les droits coach/admin, et supprimer définitivement un compte.

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0002_members_admin_rls.sql`)
- Nouvelle policy `members_select_all_for_admin` : un admin peut désormais lire l'annuaire complet (les autres profils continuent de ne voir que leur propre fiche).
- Nouvelle policy `members_update_by_admin` : un admin peut modifier n'importe quelle fiche (infos + `is_admin`/`is_coach`/`active`). Les colonnes `must_change_password` et `last_login_at` restent hors de portée de ce canal — elles ne sont modifiables que par les RPC dédiées de la phase 1.
- Contrainte `members_email_format` : validation stricte du format d'email au niveau base (en complément du contrôle déjà fait côté formulaire et côté Edge Function).

### Edge Functions
- `reset-member-password` (nouvelle) : réservée aux admins, remet le mot de passe d'un membre à son numéro de licence et repositionne `must_change_password = true`.
- `delete-member-account` (nouvelle) : réservée aux admins, supprime définitivement le compte Auth d'un membre (la fiche `members` est supprimée automatiquement par la contrainte `on delete cascade`). Un admin ne peut pas se supprimer lui-même (garde-fou pour éviter un verrouillage accidentel).
- `create-member-account` (existante, refactorée) : la vérification "l'appelant est-il admin ?" a été extraite dans un utilitaire partagé (`_shared/require-admin.ts`) réutilisé par les deux nouvelles fonctions, pour éviter de dupliquer cette logique de sécurité trois fois.

### Frontend (`webapp/src/`)
- `domain/member.ts` : ajout de `NewMemberInput` (champs de création) et `MemberUpdateInput` (champs modifiables par l'admin).
- `services/members.repository.ts` : `fetchAllMembers()` (annuaire complet) et `updateMember()` (écriture directe, protégée par la RLS admin). `fetchOwnMember()` a été corrigé pour filtrer explicitement sur l'utilisateur courant (nécessaire maintenant qu'un admin peut voir plusieurs lignes).
- `services/admin-members.service.ts` : orchestration des actions admin (`createMember`, `updateMember`, `resetMemberPassword`, `deleteMember`), qui appellent les Edge Functions ou la mise à jour directe selon le besoin.
- `components/member-form.ts` : formulaire réutilisé pour la création (champs de la spec : nom, prénom, email, sexe, année de naissance, n° licence, type de licence) et l'édition (mêmes champs + cases à cocher coach/admin/actif, affichées uniquement en édition).
- `components/members-list.ts` : tableau de l'annuaire avec actions (Modifier, Désactiver/Réactiver, Réinitialiser le mot de passe, Supprimer avec confirmation).
- `components/admin-members-view.ts` : bascule entre la liste et le formulaire.
- `components/app-shell.ts` : ajout d'un onglet **"Membres"**, affiché uniquement si `member.isAdmin` — premher exemple concret de la règle "un admin voit ce menu, pas les coachs/joueurs".

### Corrections d'environnement en cours de route
- **`vite` rétrogradé de la 8.x vers la 7.x** : la version 8 remplace Rollup par Rolldown comme bundler par défaut, et le binding natif Windows de Rolldown ne s'installait pas correctement sur ce poste (`vite build` échouait). La 7.x embarque toujours `esbuild@^0.25` (faille déjà corrigée) sans ce problème — `npm audit` reste propre. Si vous voyez un jour une erreur `Cannot find native binding` en lançant `npm run build`, vérifiez que `webapp/package.json` cible bien `vite@^7.x`.
- Confirmation que le souci de shims `.cmd`/`.ps1` manquants (phase 1) peut réapparaître même depuis PowerShell — ce n'est pas garanti à 100% lié au shell utilisé. En cas de `'tsc'/'vite' n'est pas reconnu` : supprimer `webapp/node_modules` (et `webapp/package-lock.json` si besoin) et relancer `npm install`.

### Validation locale
`npm run build` (typecheck strict + build) passe sans erreur.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : SQL Editor Supabase → coller `supabase/migrations/0002_members_admin_rls.sql` → exécuter.
2. **Déployer les deux nouvelles Edge Functions** (depuis la racine du dépôt, pas depuis `webapp/`) :
   ```
   npx supabase functions deploy reset-member-password
   npx supabase functions deploy delete-member-account
   ```
   (`create-member-account` a été modifiée mais son contrat n'a pas changé — vous pouvez la redéployer aussi par prudence : `npx supabase functions deploy create-member-account`.)

## Comment tester (en local, `npm run dev`)

1. Se connecter avec le compte admin (créé en phase 1).
2. Vérifier qu'un onglet **"Membres"** apparaît dans la navigation (et seulement pour ce compte admin).
3. Cliquer sur **"+ Ajouter un membre"**, remplir le formulaire avec un nouveau membre de test, valider : vérifier le message indiquant que son mot de passe initial est son numéro de licence.
4. Vérifier que ce nouveau membre apparaît dans la liste.
5. Ouvrir un **autre navigateur/onglet privé**, se connecter avec l'email + le numéro de licence de ce membre de test : vérifier qu'on arrive bien sur l'écran de changement de mot de passe obligatoire (comme en phase 1), sans voir l'onglet "Membres" une fois connecté.
6. Retour côté admin : cliquer **"Modifier"** sur ce membre, cocher **"Coach"**, enregistrer : vérifier que le badge "Coach" apparaît dans la liste.
7. Cliquer **"Désactiver"** puis **"Réactiver"** : vérifier le changement visuel dans la liste.
8. Cliquer **"Réinitialiser mdp"** : côté membre de test, se déconnecter/reconnecter avec son numéro de licence comme mot de passe : vérifier que l'écran de changement de mot de passe réapparaît.
9. Cliquer **"Supprimer"** sur le membre de test, confirmer : vérifier qu'il disparaît de la liste et qu'il ne peut plus se connecter.
10. Vérifier qu'un admin ne peut pas se supprimer lui-même (le bouton "Supprimer" sur sa propre ligne doit afficher une erreur).

Une fois ces points validés, on pourra enchaîner sur la **Phase 3 — Catégories d'âge**.
