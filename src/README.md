# DOUCINE - Frontend Vue.js

Cette partie du projet contient le frontend Vue.js pour le site DOUCINE, qui consomme l'API REST fournie par le backend Strapi.

## Structure du projet

```
src/
├── assets/         # Ressources statiques (images, styles, etc.)
├── components/     # Composants Vue réutilisables
├── router/         # Configuration des routes
├── services/       # Services pour les appels API
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

## Intégration avec Strapi

L'intégration avec le backend Strapi se fait via le service API situé dans `services/api.js`. Ce service utilise Axios pour effectuer des requêtes HTTP vers l'API Strapi.

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

### Format des données

Les données récupérées depuis l'API Strapi sont transformées pour correspondre à la structure attendue par les composants Vue. Cette transformation est effectuée par la méthode `formatEvents()` dans le composant `Evenement.vue`.

## Styles et design

Le design utilise des feuilles de style personnalisées avec une approche mobile-first. Les principaux fichiers de style sont :

- `assets/styles/main.css` : Styles de base
- `assets/styles/animations.css` : Animations

## Gestion des dates

Le formatage des dates est géré par l'utilitaire `dateFormatter.js` qui fournit des fonctions pour formater les dates en français :

```javascript
// Obtenir l'abréviation d'un mois
dateFormatter.getMonthAbbreviation(monthIndex)

// Formater une date pour les événements
dateFormatter.formatEventDate(isoDate)
```

## Variables d'environnement

Les variables d'environnement sont définies dans le fichier `.env` à la racine du projet :

- `VUE_APP_API_URL` : URL de l'API Strapi (par défaut : `http://localhost:1337`)

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