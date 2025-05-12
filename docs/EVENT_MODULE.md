# Module de Gestion des Événements

Ce document explique le fonctionnement du nouveau module de gestion des événements qui utilise Node.js, TypeScript et SQLite. Ce module a été développé pour remplacer progressivement la gestion des événements dans Strapi, tout en maintenant la compatibilité avec le reste de l'application.

## Architecture

Le module d'événements est composé de :

1. **Backend** : Un serveur Express avec TypeScript qui expose des API REST pour la gestion des événements
2. **Base de données** : SQLite pour stocker les données des événements
3. **Frontend Admin** : Interface Vue.js pour gérer les événements (créer, lire, modifier, supprimer)
4. **Frontend Public** : Composants Vue.js pour afficher les événements sur le site public

### Structure des fichiers

```
/server
  /event-module
    /db.ts                 # Configuration et initialisation de la base de données SQLite
    /event.routes.ts       # Routes API pour les événements
    /event.service.ts      # Services pour la gestion des événements
    /event.types.ts        # Types TypeScript pour les événements

/src
  /admin
    /views
      /EventList.vue       # Liste des événements dans l'admin
      /EventForm.vue       # Formulaire pour créer/modifier un événement
      /EventDetails.vue    # Détails d'un événement
    /services
      /eventService.js     # Service pour interagir avec l'API d'événements (admin)
  
  /services
    /eventService.js       # Service pour interagir avec l'API d'événements (public)
  
  /views
    /Evenement.vue         # Page publique des événements
```

## Configuration et Démarrage

### Prérequis

- Node.js (v14+)
- npm ou yarn

### Variables d'environnement

Le module utilise les variables d'environnement suivantes :

- `VUE_APP_EVENT_API_URL` : URL de l'API d'événements (par défaut : `http://localhost:3001/api/v2`)
- `EVENT_DB_PATH` : Chemin vers la base de données SQLite (par défaut : `./events.db`)

### Démarrage du serveur

Pour démarrer le serveur d'événements :

```bash
# Démarrer uniquement le serveur d'événements
npm run dev:server

# Démarrer le serveur d'événements et l'application frontend
npm run dev
```

Le serveur d'événements sera accessible à l'adresse : http://localhost:3001

## API REST

### Endpoints publics

- `GET /api/v2/events` : Récupérer tous les événements
- `GET /api/v2/events/:id` : Récupérer un événement spécifique par ID

### Endpoints admin

- `GET /api/v2/admin/events` : Récupérer tous les événements (pour l'interface admin)
- `GET /api/v2/admin/events/:id` : Récupérer un événement spécifique par ID
- `POST /api/v2/admin/events` : Créer un nouvel événement
- `PUT /api/v2/admin/events/:id` : Mettre à jour un événement existant
- `DELETE /api/v2/admin/events/:id` : Supprimer un événement

## Structure des données

Un événement a la structure suivante :

```typescript
interface Event {
  id: string;
  titre: string;
  description: string;
  horaire: string;
  lieu: string;
  date: {
    jour: string;
    mois: string;
    annee: string;
  };
  details: {
    destination: string;
    prix?: string;
    places?: number;
    duree?: string;
    difficulte?: string;
    equipement?: string[];
  };
  image?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Interface Admin

L'interface d'administration des événements est accessible à l'adresse : http://localhost:8080/admin/events

Elle permet de :
- Voir la liste de tous les événements
- Voir les détails d'un événement spécifique
- Créer un nouvel événement
- Modifier un événement existant
- Supprimer un événement

## Transition depuis Strapi

Ce module d'événements est conçu pour fonctionner en parallèle avec Strapi, qui reste le backend principal pour les autres fonctionnalités du site. La stratégie de transition est la suivante :

1. Développer le nouveau module d'événements avec ses propres API
2. Migrer les données des événements depuis Strapi vers la nouvelle base de données SQLite
3. Mettre à jour le frontend pour utiliser les nouvelles API d'événements
4. Une fois la migration terminée et validée, désactiver ou supprimer les parties de Strapi liées aux événements

### Migration des données

Pour migrer les données depuis le fichier `eventData.js` vers la base de données SQLite, vous pouvez utiliser l'API admin pour créer les événements un par un. Voici un exemple de code que vous pouvez exécuter dans la console du navigateur ou dans un script Node.js :

```javascript
// Exemple de code pour migrer les événements
const axios = require('axios');
const events = require('./src/data/eventData.js').default;

const API_URL = 'http://localhost:3001/api/v2';

async function migrateEvents() {
  for (const event of events) {
    try {
      await axios.post(`${API_URL}/admin/events`, event);
      console.log(`Événement migré avec succès : ${event.titre}`);
    } catch (error) {
      console.error(`Erreur lors de la migration de l'événement ${event.titre}:`, error.message);
    }
  }
}

migrateEvents();
```

### Mise à jour du frontend

Le frontend a été mis à jour pour utiliser le nouveau service d'événements au lieu d'importer directement les données depuis `eventData.js`. Cela permet une transition en douceur vers le nouveau backend.

## Dépannage

### Problèmes courants

1. **Erreur "Impossible de charger les événements"** :
   - Vérifier que le serveur d'événements est bien démarré
   - Vérifier que l'URL de l'API est correcte dans les variables d'environnement

2. **Erreur "Invalid Date"** :
   - Vérifier que la structure de la date est correcte (jour, mois, année)

3. **Événements non affichés sur le site public** :
   - Vérifier que les événements ont bien été migrés vers la base de données SQLite
   - Vérifier que le frontend utilise bien le service d'événements et non les données statiques

### Logs

Les logs du serveur sont affichés dans la console lors du démarrage. Pour des logs plus détaillés, vous pouvez ajouter des instructions `console.log` ou `console.error` dans le code.

## Développement futur

Améliorations prévues :

1. Authentification pour sécuriser les routes admin
2. Pagination pour la liste des événements
3. Filtres et recherche pour les événements
4. Gestion des images (upload, redimensionnement)
5. Tests unitaires et d'intégration
