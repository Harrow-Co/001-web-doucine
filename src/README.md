# Frontend Vue.js - DOUCINE

Cette partie du projet contient le frontend Vue.js pour le site DOUCINE.

## Structure du projet

```
src/
├── assets/         # Ressources statiques (images, styles, etc.)
├── components/     # Composants Vue réutilisables
├── router/         # Configuration des routes
├── services/       # Services pour les appels API
├── store/          # Gestion de l'état avec Vuex (si utilisé)
├── utils/          # Utilitaires (formatage des dates, etc.)
├── views/          # Pages principales
├── App.vue         # Composant racine
└── main.js         # Point d'entrée
```

## Points d'accès principaux

- **Home** (`/`) : Page d'accueil
- **Événements** (`/evenement`) : Liste des événements
- **À propos** (`/apropos`) : Page à propos

## Composants clés

### Composants de page

- **Home.vue** : Page d'accueil
- **Evenement.vue** : Page de listing des événements
- **Apropos.vue** : Page à propos

### Composants réutilisables

- **Navbar.vue** : Barre de navigation
- **TheFooter.vue** : Pied de page
- **CookieConsent.vue** : Gestion du consentement aux cookies

## Données et API

Les données affichées dans l'application sont récupérées via des appels API.

Le service API principal se trouve dans `services/api.js`, qui utilise Axios pour les requêtes HTTP.

### Événements

Le service `eventService` expose plusieurs méthodes pour récupérer les événements :

```javascript
// Récupérer tous les événements
eventService.getEvents()

// Récupérer un événement par son ID
eventService.getEventById(id)

// Récupérer les événements à venir
eventService.getUpcomingEvents()

// Récupérer les événements passés
eventService.getPastEvents()
```

Les données récupérées depuis l'API peuvent être transformées pour correspondre à la structure attendue par les composants Vue.

### Formatage des dates

Un utilitaire de formatage de date (`utils/dateFormatter.js`) est disponible :

```javascript
// Obtenir l'abréviation d'un mois
dateFormatter.getMonthAbbreviation(monthIndex)

// Formater une date pour les événements
dateFormatter.formatEventDate(isoDate)
```

## Styles et design

Le design utilise des feuilles de style personnalisées avec une approche mobile-first. Les principaux fichiers de style sont :

- `assets/styles/main.css` : Styles de base
- `assets/styles/animations.css` : Animations

## Variables d'environnement

Les variables d'environnement spécifiques au frontend peuvent être définies dans des fichiers `.env` (par exemple, `.env.development`, `.env.production`) à la racine du projet frontend (`src/` ou la racine du projet global selon votre configuration).

## Compilation et déploiement

### Développement

Pour lancer le serveur de développement :

```bash
npm run serve
```

### Production

Pour compiler le projet pour la production :

```bash
npm run build
```

Le résultat de la compilation se trouve dans le dossier `dist/`. 