# Calendrier (ajouté après la doc 12)

## Objectif

Nouvel onglet "Calendrier", visible par tous : un calendrier mensuel affichant les entraînements (distincts des évènements sportifs/tournois/hats) et les dates des évènements déjà déclarés dans l'application. Seuls les admins peuvent déclarer un entraînement.

## Actions réalisées (Claude)

### Base de données (`supabase/migrations/0015_trainings.sql`)
- Table `trainings` : une date (**unique** — l'énoncé dit "un entrainement" au singulier par jour, donc au plus un par date), un format (`Indoor`/`Outdoor`) et un public (`Open N3`, `Open N2`, `Féminin`, `Mixte`, `Open DR`, `Tous`).
- RLS : lecture ouverte à tous, écriture réservée aux admins.
- Aucune table pour les évènements sportifs/tournois/hats : le calendrier réutilise simplement `fetchEvents()` (déjà en cache 15 min, phase "cache événements") et affiche chaque évènement sur tous les jours entre `startDate` et `endDate` inclus — sans condition de disponibilité, conformément à la demande ("il n'est pas nécessaire d'être disponible pour voir un évènement... dans le calendrier").

### Génération de la grille mensuelle
- `domain/calendar.ts` (+ tests) : `buildMonthGrid(year, month)` construit des semaines complètes de lundi à dimanche (complétées par les jours des mois voisins), `toDateKey()` formate une date en `yyyy-mm-dd` en **heure locale** (contrairement à `toISOString()`, qui bascule en UTC et peut décaler le jour affiché d'une unité près de minuit), `isDateKeyInRange()` teste si un jour tombe dans l'intervalle d'un évènement.
- Les tests vérifient des **propriétés génériques** (grille toujours lundi→dimanche, jours consécutifs sans trou, tous les jours du mois présents une seule fois) plutôt que des dates codées en dur, pour éviter tout risque d'erreur de calcul manuel dans les tests eux-mêmes.

### Frontend (`webapp/src/`)
- `domain/training.ts` : formats et publics fixes.
- `services/trainings.repository.ts` : CRUD classique.
- `components/training-form.ts` : formulaire (format en 2 boutons tactiles, public en liste déroulante), la **date est fixe** — un entraînement se déclare en cliquant un jour du calendrier, pas via un champ date libre. Inclut un bouton "Supprimer" en mode édition.
- `components/calendar-view.ts` : vue mensuelle (navigation ← mois précédent / "Aujourd'hui" / mois suivant →, la plus simple possible) où chaque jour affiche un point violet s'il y a un entraînement et un point rose par évènement (jusqu'à 3). Cliquer un jour ouvre son détail : entraînement (avec "Modifier"/"+ Déclarer un entraînement" pour les admins) et liste des évènements de ce jour, **chaque évènement cliquable** pour rejoindre directement son détail dans l'onglet Événements (même mécanisme que la page d'accueil : évènement `select-event` remonté jusqu'à `app-shell`, qui bascule sur l'onglet Événements).
- `components/app-shell.ts` : nouvel onglet **"Calendrier"**, visible par tous.

### Corrections apportées après un premier retour
- **Affichage direct sur les cellules** : les points de couleur ont été remplacés par du texte directement lisible dans chaque case du calendrier — le nom pour un évènement, "Indoor/Outdoor · Public" pour un entraînement (jusqu'à 3 lignes visibles, puis "+N" si plus).
- **Entraînements récurrents** : `training-form.ts` propose désormais, à la création (pas en modification), une case "Répéter chaque [jour de la semaine]" + une date de fin. `domain/calendar.ts::weeklyDatesBetween()` (testée) calcule toutes les dates par pas de 7 jours, et `services/trainings.repository.ts::createRecurringTrainings()` les crée en une fois — les dates qui ont déjà un entraînement déclaré sont ignorées (jamais écrasées), avec un message récapitulatif ("N créé(s), M déjà existant(s) ignoré(s)").
- **"Tous" présélectionné** : réordonné en tête de `TRAINING_AUDIENCES` (déjà la valeur par défaut du formulaire, mais aussi affiché en premier dans la liste déroulante).
- **Couleur par public** : `domain/training.ts::AUDIENCE_COLORS` associe une couleur à chaque public (Tous = gris, Open N3 = rouge, Open N2 = orange, Féminin = jaune, Mixte = vert, Open DR = violet), appliquée sur l'étiquette de la cellule du calendrier et sur le badge du détail de jour — pour repérer le public d'un entraînement d'un coup d'œil.
- **Deux badges distincts pour un entraînement** (au lieu d'un seul texte combiné "Format · Public"), affichés **côte à côte sur une même ligne** : `domain/training.ts::FORMAT_COLORS` colore Indoor en bleu et Outdoor en vert, tandis que le public garde son code couleur existant (`AUDIENCE_COLORS`). Appliqué à la fois dans les cellules du calendrier (grille et agenda) et dans le détail de jour.
- **Vue "agenda" sur mobile** : une grille à 7 colonnes ne laisse physiquement pas assez de place pour du texte lisible en entier sur un écran de smartphone. En dessous de 600px de large, la grille est remplacée par une **liste verticale** (un jour par ligne, pleine largeur) où les étiquettes s'affichent en plus grand et ne sont jamais tronquées (`white-space: normal`, pas d'ellipse). Les jours sans rien restent compacts, ceux avec un entraînement/évènement sont mis en valeur — et restent cliquables pour ouvrir le détail du jour (donc pour un admin, déclarer un entraînement sur un jour vide reste possible). Au-dessus de 600px, la grille classique reste affichée.

### Validation locale
`npm run test` (75 tests) et `npm run build` passent sans erreur.

## Actions manuelles à réaliser (vous)

1. **Exécuter la migration SQL** : SQL Editor Supabase → coller `supabase/migrations/0015_trainings.sql` → exécuter.
   - Aucune nouvelle Edge Function.

## Comment tester (en local, `npm run dev`)

1. Se connecter en admin, ouvrir "Calendrier" : vérifier la navigation (mois précédent/suivant, "Aujourd'hui").
2. Cliquer un jour sans entraînement : vérifier "Aucun entraînement prévu" + bouton "+ Déclarer un entraînement". Le créer (Indoor/Outdoor + public), vérifier le retour au calendrier avec un point violet sur ce jour.
3. Rouvrir ce jour, "Modifier", changer le format/public, enregistrer : vérifier la mise à jour. Puis "Supprimer" : vérifier la disparition du point.
4. Créer un évènement sur plusieurs jours (phase 5, dates de début/fin différentes) : vérifier qu'un point rose apparaît sur **chaque** jour de l'intervalle dans le calendrier, et que cliquer l'évènement dans le détail du jour ouvre bien son détail dans l'onglet Événements.
5. Se connecter avec un compte non-admin : vérifier que le calendrier est consultable (entraînements + évènements visibles) mais sans bouton "Déclarer"/"Modifier"/"Supprimer" un entraînement.
