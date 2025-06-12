# DOUCINE - Site Web

Ce projet est un site web pour l'association DOUCINE, avec un backend Node.js/Express/SQLite et un frontend Vue.js.

## Développement local

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

## Déploiement avec Docker

### Prérequis

- Docker et Docker Compose installés sur le serveur
- Un nom de domaine configuré pour pointer vers votre serveur

### Étapes de déploiement

1. **Préparer les variables d'environnement**

   Copiez le fichier `.env.example` vers `.env` et configurez les variables :

   ```bash
   cp .env.example .env
   nano .env  # Éditez les variables selon vos besoins
   ```

2. **Préparer les fichiers Traefik**

   ```bash
   # Créer le fichier acme.json avec les bonnes permissions
   mkdir -p traefik
   touch traefik/acme.json
   chmod 600 traefik/acme.json

   # Créer le fichier de configuration Traefik
   nano traefik/traefik.yml
   ```

   Contenu recommandé pour `traefik.yml` :

   ```yaml
   api:
     dashboard: true
   
   entryPoints:
     web:
       address: ":80"
       http:
         redirections:
           entryPoint:
             to: websecure
             scheme: https
     websecure:
       address: ":443"
   
   providers:
     docker:
       endpoint: "unix:///var/run/docker.sock"
       exposedByDefault: false
   
   certificatesResolvers:
     letsencrypt:
       acme:
         email: "votre@email.com"  # Remplacez par votre email
         storage: /acme.json
         httpChallenge:
           entryPoint: web
   ```

3. **Créer le réseau Docker pour Traefik**

   ```bash
   docker network create traefik-public
   ```

4. **Lancer les conteneurs**

   ```bash
   docker compose up -d
   ```

5. **Vérifier les logs**

   ```bash
   docker compose logs -f
   ```

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

## Sécurité

- Assurez-vous de changer les valeurs par défaut dans le fichier `.env`
- Le secret JWT doit être une chaîne aléatoire complexe
- Les mots de passe sont stockés de manière sécurisée avec bcrypt

## Sauvegarde

Les bases de données SQLite sont stockées dans le dossier `data/`. Pour sauvegarder vos données :

```bash
# Créer une sauvegarde des bases de données
tar -czvf doucine-backup-$(date +%Y%m%d).tar.gz data/
```

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