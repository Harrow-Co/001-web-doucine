# Documentation du Serveur Backend Doucine

## Vue d'ensemble

Ce serveur backend est développé avec Node.js, Express et TypeScript pour remplacer progressivement l'ancienne API Strapi (API v1). Il utilise SQLite comme base de données pour stocker les événements et les informations d'authentification.

## Architecture

Le serveur est organisé en modules fonctionnels :

- **event-module** : Gestion des événements (création, lecture, mise à jour, suppression)
- **auth-module** : Authentification et gestion des utilisateurs avec JWT

## Configuration

### Variables d'environnement

Le serveur utilise les variables d'environnement suivantes :

```
PORT=3000                      # Port du serveur
JWT_SECRET=votre_secret_jwt    # Clé secrète pour signer les tokens JWT
ADMIN_USERNAME=admin           # Nom d'utilisateur admin par défaut
ADMIN_PASSWORD=motdepasse      # Mot de passe admin par défaut
ADMIN_EMAIL=admin@example.com  # Email admin par défaut
```

### Bases de données

Le serveur utilise deux bases de données SQLite :

- `events.db` : Stocke les informations sur les événements
- `auth.db` : Stocke les informations sur les utilisateurs et l'authentification

## API Endpoints

### Authentification

- **POST /api/v2/auth/login** : Authentification utilisateur
  - Corps : `{ "username": "admin", "password": "motdepasse" }`
  - Retourne : `{ "token": "jwt_token", "user": { ... } }`

- **GET /api/v2/auth/me** : Récupérer les informations de l'utilisateur connecté
  - Headers : `Authorization: Bearer jwt_token`
  - Retourne : `{ "id": "...", "username": "...", "role": "..." }`

### Événements (Publics)

- **GET /api/v2/events** : Récupérer tous les événements publics
  - Retourne : `[ { "id": "...", "title": "...", ... }, ... ]`

- **GET /api/v2/events/:id** : Récupérer un événement spécifique
  - Retourne : `{ "id": "...", "title": "...", ... }`

### Événements (Admin)

Ces routes nécessitent une authentification avec un token JWT valide et un rôle d'éditeur ou d'administrateur.

- **POST /api/v2/admin/events** : Créer un nouvel événement
  - Headers : `Authorization: Bearer jwt_token`
  - Corps : `{ "title": "...", "description": "...", ... }`
  - Retourne : `{ "id": "...", "title": "...", ... }`

- **GET /api/v2/admin/events** : Récupérer tous les événements (admin)
  - Headers : `Authorization: Bearer jwt_token`
  - Retourne : `[ { "id": "...", "title": "...", ... }, ... ]`

- **GET /api/v2/admin/events/:id** : Récupérer un événement spécifique (admin)
  - Headers : `Authorization: Bearer jwt_token`
  - Retourne : `{ "id": "...", "title": "...", ... }`

- **PUT /api/v2/admin/events/:id** : Mettre à jour un événement
  - Headers : `Authorization: Bearer jwt_token`
  - Corps : `{ "title": "...", "description": "...", ... }`
  - Retourne : `{ "id": "...", "title": "...", ... }`

- **DELETE /api/v2/admin/events/:id** : Supprimer un événement
  - Headers : `Authorization: Bearer jwt_token`
  - Retourne : `{ "message": "Event deleted successfully" }`

## Modèles de données

### Événement

```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: {
    start: string; // Format ISO
    end: string;   // Format ISO
  };
  location: string;
  image?: string;
  details?: {
    capacity?: number;
    price?: number;
    category?: string;
    tags?: string[];
  };
  createdAt: string;
  updatedAt: string;
}
```

### Utilisateur

```typescript
interface User {
  id: string;
  username: string;
  password: string; // Hashé avec bcrypt
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  updatedAt: string;
}
```

## Middlewares d'authentification

### authenticate

Vérifie si l'utilisateur est authentifié via un token JWT.

```typescript
// Utilisation
router.get('/protected-route', authenticate, (req, res) => {
  // Accès à req.user
});
```

### requireAdmin

Vérifie si l'utilisateur authentifié a le rôle d'administrateur.

```typescript
// Utilisation
router.get('/admin-only', authenticate, requireAdmin, (req, res) => {
  // Accès limité aux administrateurs
});
```

### requireEditor

Vérifie si l'utilisateur authentifié a le rôle d'éditeur ou d'administrateur.

```typescript
// Utilisation
router.get('/editor-or-admin', authenticate, requireEditor, (req, res) => {
  // Accès limité aux éditeurs et administrateurs
});
```

## Déploiement

### Configuration du serveur

1. Cloner le dépôt sur le serveur VPS
2. Installer les dépendances : `npm install`
3. Compiler le TypeScript : `npm run build`
4. Configurer les variables d'environnement dans un fichier `.env`
5. Démarrer le serveur avec PM2 : `pm2 start dist/server.js --name doucine-backend`

### Configuration Apache

Configurer un VirtualHost Apache pour rediriger les requêtes vers le serveur Node.js :

```apache
<VirtualHost *:443>
    ServerName api.association-doucine.fr
    
    # Proxy pour l'API Node.js
    ProxyRequests Off
    ProxyPreserveHost On
    
    # Configuration CORS
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header always set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    
    # Redirection des requêtes /api/v2 vers le serveur Node.js
    ProxyPass /api/v2 http://localhost:3000/api/v2
    ProxyPassReverse /api/v2 http://localhost:3000/api/v2
    
    # Configuration SSL
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/api.association-doucine.fr/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/api.association-doucine.fr/privkey.pem
</VirtualHost>
```

## Maintenance

### Sauvegarde des bases de données

Il est recommandé de sauvegarder régulièrement les bases de données SQLite :

```bash
# Créer un répertoire de sauvegarde
mkdir -p /var/backups/doucine-backend

# Sauvegarder les bases de données
cp /var/www/doucine-backend/events.db /var/backups/doucine-backend/events_$(date +%Y%m%d).db
cp /var/www/doucine-backend/auth.db /var/backups/doucine-backend/auth_$(date +%Y%m%d).db
```

### Mise à jour du serveur

Pour mettre à jour le serveur :

```bash
# Se placer dans le répertoire du projet
cd /var/www/doucine-backend

# Tirer les dernières modifications
git pull origin feature/admin-panel-sqlite

# Installer les dépendances si nécessaire
npm install

# Compiler le TypeScript
npm run build

# Redémarrer le serveur
pm2 restart doucine-backend
```

## Dépannage

### Logs du serveur

Les logs du serveur sont disponibles via PM2 :

```bash
# Voir les logs en temps réel
pm2 logs doucine-backend

# Voir les dernières lignes des logs
pm2 logs doucine-backend --lines 100
```

### Problèmes courants

1. **Erreur de connexion à la base de données** : Vérifier les permissions des fichiers `.db`
2. **Erreur d'authentification** : Vérifier la variable d'environnement `JWT_SECRET`
3. **Erreur CORS** : Vérifier la configuration CORS dans `server.ts` et dans Apache

## Migration depuis Strapi (API v1)

Cette API v2 est conçue pour remplacer progressivement l'API Strapi existante. La migration se fait module par module, en commençant par la gestion des événements.

Pour migrer d'autres fonctionnalités de Strapi vers cette nouvelle API :

1. Créer un nouveau module dans le dossier `server/`
2. Définir les modèles de données et les services
3. Implémenter les routes publiques et admin
4. Mettre à jour le frontend pour utiliser la nouvelle API

## Sécurité

- Les mots de passe sont hashés avec bcrypt
- L'authentification utilise des tokens JWT avec expiration
- Les routes admin sont protégées par des middlewares d'authentification
- Les variables sensibles sont stockées dans des variables d'environnement
