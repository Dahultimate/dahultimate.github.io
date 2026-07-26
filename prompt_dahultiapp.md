# Besoin général
Je souhaite créer une application qui permette à des membres (préalablement inscrits manuellement par l'administrateur) d'une association sportive d'indiquer leur disponibilité à des évènements.
J'ai un budget de 0.

L'application a déjà un site web statique.
Je souhaite que l'on puisse accéder à la nouvelle application simplement via une nouvelle URL (https://www.xxxx.fr/app), mais je ne veux pas qu'on puisse accéder à l'application depuis un bouton sur le site statique.


L'application doit permettre de gérer différents types de profils : administrateur, coach, joueur
L'application doit avoir un accès sécurisé à la base de données.

# Besoin technique
Le frontend doit être déployé sur Github Pages.
La base de données doit être une base Supabase gratuite, dont l'accès doit être sécurisé.

Architecture : 
- HTML
- Typescript
- Web Components Lit
- Supabase Postgres
- SDK Supabase côté navigateur
- Sécurité d'écriture RLS + validation stricte des champs

# Contraintes techniques globales

- Utiliser TypeScript strict partout.
- Utiliser Supabase pour Auth, DB et Edge Function.
- Interdire toute logique métier dans les composants UI.
- Architecture propre obligatoire avec services, interfaces, objets métier, composants unitaires séparés.
- Aucune classe monolithique.
- Code orienté testabilité (unitaires + intégration).
- Web Components Lit séparés et unitaires.


# Besoins ergonomiques
L'application doit être totalement responsive, simple et intuitive, tout en adoptant un design moderne et épuré. Les différentes fonctionnalités peuvent être placées dans des onglets différents, ou dans un menu pour que l'application web ressemble à une application mobile Android.

Les boutons, liens, et autre éléments de la page doivent être visibles seulement par les utilisateurs dont le profil autorise la fonctionnalité.

Par exemple : un administrateur doit pouvoir voir le menu pour ajouter des membres, mais pas les coachs et les joueurs.
Autre exemple : une fois connecté, les utilisateurs ne doivent plus voir les boutons de connexion.

## Droits des utilisateurs 
Il existe trois types de profils d'utilisateurs : 
- Les administrateurs
- Les coachs
- Les joueurs

Les coachs sont des joueurs avec des droits supplémentaires
Les administrateurs sont des joueurs avec des droits administrateurs

# Use cases
## Je veux ajouter des utilisateurs 
- Les administrateurs disposent d'un formulaire spécifique pour ajouter des membres en indiquant : 
  - Leur nom
  - Leur prénom
  - Leur sexe
  - Leur année de naissance
  - Leur numéro de licence
  - Leur type de licence (compétition ou loisir)

### Catégorie d'âge

A l'inscription, leur catégorie d'age est définie en fonction de leur année de naissance selon les règles suivantes : 
- pour les femmes : 
  - née avant 1982 inclus : Great Grand Master
  - née entre 1983 inclus et 1990 inclus : Grand Master
  - née entre 1991 inclus et 1997 inclus : Master
  - née entre 1998 inclus et 2007 inclus : Sénior
  - née entre 2008 inclus et 2010 inclus : U20
  - née entre 2011 inclus et 2012 inclus : U17
  - née entre 2013 inclus et 2014 inclus : U15
  - née entre 2015 inclus et 2016 inclus : U13
  - née après 2017 inclus : U11
- pour les hommes : 
  - né avant 1979 inclus : Great Grand Master
  - né entre 1980 inclus et 1987 inclus : Grand Master
  - né entre 1988 inclus et 1994 inclus : Master
  - né entre 1995 inclus et 2007 inclus : Sénior
  - né entre 2008 inclus et 2010 inclus : U20
  - né entre 2011 inclus et 2012 inclus : U17
  - né entre 2013 inclus et 2014 inclus : U15
  - né entre 2015 inclus et 2016 inclus : U13
  - né après 2017 inclus : U11

Un formulaire doit être accessible afin de modifier chaque catégorie d'âge. Si une catégorie d'âge est modifiée, il est nécessaire que la catégorie d'âge des joueurs soit modifiée également. Il peut donc être plus pertinent de calculer la catégorie d'âge des joueurs quand on y accède, plutot que d'avoir un champ défini pour chaque joueur.

## Je veux me connecter pour la première fois
- Les joueurs et coachs doivent pouvoir définir un mot de passe au moment de leur première connexion.
- Les mots de passes ne doivent pas apparaître en clair dans la base de données.


## J'ai déjà un compte et je veux me connecter
- J'arrive sur la page de connexion et je rentre mon login/mot de passe
- Ma date de dernière connexion est enregistrée en base de données.
- Si j'ai déjà été connecté à l'application récemment (30 jours), alors je ne veux pas avoir à me connecter à nouveau.

## Je veux créer un évènement
- Les administrateurs et les coachs disposent d'un bouton et d'un formulaire pour déclarer un nouvel évènement.
- Les champs à renseigner sont : 
  - Type d'évènement : "Championnat", "Tournoi", "Hat", "Coupe", "Winter League"
  - La catégorie : "Mixte", "Féminin", "Open", "Loose Mixte", "Master"
  - Le format : "Indoor", "Outdoor", "Beach"
  - La division : "N1", "N2", "N3", "DR1", "DR2", "DR3"
  - Le lieu de la compétition : champ libre
  - La date de l'évènement
  - Le nom du porteur de projet (le porteur de projet doit être un membre déjà inscrit sur l'application)
  - Une date butoire de réponse 
  - Les catégories pouvant participer (femmes/hommes et les différentes catégories d'âge)

## Je veux modifier un évènement
- Les administrateurs et les coachs disposent d'un bouton et d'un formulaire pour modifier un évènement déjà créé.
- Tous les champs sont modifiables

## Je veux consulter un évènement
En tant que joueur, coach ou administrateur, je dispose de deux listes d'évènements classés par date croissante. 
La première liste est une liste des "Evènements sportifs", qui comprend les évènements de type "Championnat", "Coupe" et"Winter League".
La seconde liste est une liste des "Tournois et Hats" qui comprend les évènements de type "Tournoi" et "Hat"
Dans cette liste, avant d'accéder au détail d'un évènement, je dois pouvoir voir le nom de l'évènement, sa date et son lieu.

- Les joueurs, les coachs, et les administrateurs peuvent consulter toutes les informations d'un évènement, dont la liste des joueurs séparée en plusieurs catégories : 
  - La liste des joueurs disponibles pour l'évènement
  - La liste des joueurs indisponibles pour l'évènement
  - La liste des joueurs incertains pour l'évènement
  - La liste des joueurs qui n'ont pas répondu pour l'évènement
- Des compteurs de présence sont visibles : 
  - Le nombre de joueurs total disponibles
  - Le nombre de femmes disponibles
  - Le nombre d'hommes disponibles
  - Le nombre de personnes incertaines
  - Le nombre de joueurs qui ne sont pas concernés par l'évènement (c'est-à-dire qu'ils ne peuvent pas s'inscrire car ils ne correspondent pas aux catégories pouvant participer à l'évènement)
  - Le nombre de joueurs qui n'ont pas répondu à l'évènement
  - Le nombre de joueurs qui sont indisponibles
  - Le nombre total de réponses.

## Je veux indiquer ma disponibilité pour un évènement
Après avoir accédé au détail de l'évènement, je veux pouvoir indiquer ma disponibilité.
3 réponses sont possibles sous la forme de 3 boutons : 
- Disponible
- Indisponible
- Incertain

Un encart doit être visible au moment d'indiquer sa disponibilité sur un évènement sportif de type "Championnat", "Coupe" et"Winter League": "En vous déclarant disponible pour cet évènement, vous vous engagez à être au maximum disponible pour les entrainements de préparation et pour la compétition"

L'utilisateur doit être informé que sa réponse a bien été enregistrée. Il doit aussi être informé si sa réponse n'a pas pu être enregistrée.
La réponse de l'utilisateur doit être bien visible lorsqu'il accède au détail d'un évènement, et il doit pouvoir modifier sa réponse tant que la date du jour est avant la date butoire.

L'utilisateur ne peut pas indiquer sa disponibilité après la date butoire de l'évènement.

## Droits administrateurs

En tant qu'administrateur, je veux pouvoir : 
- Les catégories d'âge
- Les droits des utilisateurs
- Ajouter/supprimer/désactiver/modifier des utilisateurs
- Réinitialiser le mot de passe d'un utilisateur
- Modifier / ajouter / supprimer les types d'évènements sportifs ("Championnat", "Tournoi", etc.)
- Modifier / ajouter / supprimer les formats
- Modifier / ajouter / supprimer les divisions
- Modifier / ajouter / supprimer les catégories d'âge




Propose moi un plan précis d'implémentation de mon application.
Je veux que tu implémentes les fonctionnalités une à une et que tu me laisses tester chaque fonctionnalité avant d'avancer vers une nouvelle fonctionnalité.

A chaque étape, je veux que tu documentes les actions que tu réalises, et les actions à réaliser manuellement par mes soins. Pour cela, crée un répertoire docs dans lequel tu décriras de manière claire et ordonnée chaque étape du développement de l'application.
