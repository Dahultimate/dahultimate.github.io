# Phase 7 — Déclaration de disponibilité

## Objectif

Permettre à chaque membre concerné par un événement d'indiquer sa disponibilité (Disponible / Indisponible / Incertain) depuis la page détail, avec l'encart d'engagement pour les événements sportifs, le blocage après la date butoir, et la confirmation/erreur d'enregistrement.

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0008_availabilities_write.sql`)
- Deux policies RLS sur `availabilities` (table créée en lecture seule en phase 6) : un membre peut insérer/modifier **sa propre** réponse (`member_id = auth.uid()`), et uniquement **avant la date butoir** de l'événement concerné (`current_date <= response_deadline`, vérifié via une sous-requête sur `events`). Ce contrôle est fait en base — en plus du contrôle côté interface — pour qu'un appel direct à l'API après la date butoir soit refusé lui aussi.

### Frontend (`webapp/src/`)
- `services/availabilities.repository.ts` : `submitAvailability(eventId, status)`, en `upsert` (une seule fonction gère aussi bien la première réponse que sa modification, grâce à la clé primaire composite `(event_id, member_id)`).
- `components/event-detail.ts` (étendu) : nouvelle section "Votre disponibilité" insérée entre les informations de l'événement et les compteurs :
  - Si le membre n'est pas concerné par l'événement (catégorie non autorisée) : message explicatif, pas de boutons.
  - Si la date butoir est dépassée : message indiquant la date butoir et, le cas échéant, la réponse déjà enregistrée — sans possibilité de la modifier (cohérent avec le blocage RLS).
  - Sinon : les 3 boutons (le bouton correspondant à la réponse actuelle est mis en évidence), précédés de l'encart d'engagement **uniquement** pour les événements de famille "sportif" (Championnat/Coupe/Winter League — réutilise le champ `event_family` de la phase 6), et suivis d'un message de confirmation ou d'erreur après soumission.
  - Après une réponse enregistrée avec succès, le détail est entièrement rechargé : les listes et compteurs de la phase 6 reflètent donc immédiatement le changement.

### Validation locale
`npm run test` (34 tests, inchangés — aucune nouvelle logique pure à isoler ici, le calcul de statut réutilise `evaluateParticipants` déjà testé en phase 6) et `npm run build` passent sans erreur.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : SQL Editor Supabase → coller `supabase/migrations/0008_availabilities_write.sql` → exécuter.
   - Aucune nouvelle Edge Function.

## Comment tester (en local, `npm run dev`)

1. Se connecter avec un compte **concerné** par un événement existant (catégorie autorisée), ouvrir son détail : vérifier la section "Votre disponibilité" avec les 3 boutons.
2. Pour un événement de type Championnat/Coupe/Winter League : vérifier la présence de l'encart d'engagement. Pour un Tournoi/Hat : vérifier son absence.
3. Cliquer "Disponible" : vérifier le message de confirmation, le bouton mis en évidence, et que le compteur "Disponibles" (+ "dont femmes"/"dont hommes") augmente dans la section compteurs.
4. Changer sa réponse en "Incertain" : vérifier que les compteurs se mettent à jour en conséquence (le membre quitte la liste "Disponibles" pour "Incertains").
5. Créer un événement de test avec une **date butoir dans le passé** (éditable uniquement par un admin, cf. phase 5) : vérifier qu'un membre concerné voit le message "date butoir dépassée" à la place des boutons, et ne peut pas répondre.
6. Se connecter avec un compte **non concerné** par un événement (catégorie non autorisée) : vérifier le message correspondant, sans boutons.
7. Vérifier qu'un membre voit toujours sa réponse actuelle en rouvrant le détail plus tard (persistance).

Une fois ces points validés, toutes les fonctionnalités métier de la spec seront couvertes. Il restera la **Phase 8 — Finitions ergonomie, sécurité et documentation finale** (navigation façon appli mobile, responsive, revue complète des policies RLS, doc de passation) avant le déploiement final sur GitHub Pages.
