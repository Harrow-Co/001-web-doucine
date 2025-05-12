# DOUCINE - Site Web

Ce projet est un site web pour l'association DOUCINE, avec un backend Node.js/Express/SQLite et un frontend Vue.js.

## Démarrage rapide

### Prérequis

- Node.js (v14+)
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install
```

### Démarrage du serveur d'événements

```bash
# Démarrer le serveur d'événements (IMPORTANT)
npm run dev:server
```

Le serveur d'événements sera accessible à l'adresse : http://localhost:3001

### Démarrage du frontend

```bash
# Dans un autre terminal, démarrer le frontend
npm run serve
```

Le site sera accessible à l'adresse : http://localhost:8080

## Routes principales

### Routes publiques

- **Home** (`/`) : Page d'accueil
- **Événements** (`/evenement`) : Liste des événements
- **À propos** (`/apropos`) : Page à propos

### Routes admin

- **Admin Dashboard** (`/admin`) : Tableau de bord administrateur
- **Liste des événements** (`/admin/events`) : Gestion des événements
- **Créer un événement** (`/admin/events/new`) : Création d'un nouvel événement
- **Détails d'un événement** (`/admin/events/:id`) : Détails d'un événement spécifique
- **Modifier un événement** (`/admin/events/:id/edit`) : Modification d'un événement existant

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

## Documentation

Pour plus de détails sur le module de gestion des événements, consultez la documentation complète dans `docs/EVENT_MODULE.md`.

## Production

Pour compiler le projet pour la production :

```bash
npm run build
```

Le résultat de la compilation se trouve dans le dossier `dist/`. 

Pour démarrer le serveur en production :

```bash
npm run start:server