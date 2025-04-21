# Checklist de déploiement - Site DOUCINE avec CMS Strapi

Cette checklist vous aidera à déployer correctement l'ensemble du site DOUCINE avec son CMS Strapi sur votre environnement de production.

## Préparation

- [ ] Choisir un hébergeur adapté
  - Pour le frontend : hébergement statique (Netlify, Vercel, OVH, etc.)
  - Pour le backend : hébergement NodeJS (DigitalOcean, Heroku, Render, etc.)
  - *Alternative* : hébergement unique capable de gérer NodeJS et fichiers statiques

- [ ] Acquérir un nom de domaine (ex: doucine.org)
  - [ ] Configurer les enregistrements DNS pour pointer vers vos serveurs
  - [ ] *Optionnel* : Configurer un sous-domaine pour l'API (ex: api.doucine.org)

- [ ] Préparer une base de données de production 
  - SQLite (plus simple pour commencer)
  - Ou PostgreSQL/MySQL (plus adapté pour une grande échelle)

## Déploiement du backend (Strapi)

- [ ] Configurer les variables d'environnement de production
  ```
  # Fichier .env dans le dossier server/
  HOST=0.0.0.0
  PORT=1337
  APP_KEYS=clé-secrète-1,clé-secrète-2
  API_TOKEN_SALT=sel-aléatoire
  ADMIN_JWT_SECRET=clé-jwt-admin
  JWT_SECRET=clé-jwt-utilisateurs
  DATABASE_CLIENT=sqlite
  DATABASE_FILENAME=.tmp/data.db
  ```

- [ ] Configurer CORS pour autoriser le domaine frontend
  ```
  # Dans server/config/middlewares.js
  module.exports = [
    {
      name: 'strapi::cors',
      config: {
        origin: ['https://votre-domaine.com']
      }
    },
    // ...autres middlewares
  ];
  ```

- [ ] Construire l'application admin
  ```bash
  cd server
  NODE_ENV=production npm run build
  ```

- [ ] Déployer les fichiers vers le serveur de production
  ```bash
  # Exemple avec rsync
  rsync -avz --exclude node_modules --exclude .git ./server/ user@serveur:/chemin/vers/destination/
  ```

- [ ] Sur le serveur, installer les dépendances
  ```bash
  cd /chemin/vers/destination/
  npm install --production
  ```

- [ ] Démarrer l'application en production
  ```bash
  NODE_ENV=production npm run start
  ```

- [ ] *Recommandé* : Configurer un gestionnaire de processus (PM2)
  ```bash
  npm install -g pm2
  pm2 start npm --name "doucine-api" -- run start
  pm2 save
  pm2 startup
  ```

## Déploiement du frontend (Vue.js)

- [ ] Configurer les variables d'environnement de production
  ```
  # Fichier .env.production à la racine du projet
  VUE_APP_API_URL=https://api.votre-domaine.com
  ```

- [ ] Construire l'application pour la production
  ```bash
  npm run build
  ```

- [ ] Déployer le contenu du dossier `dist/` vers votre hébergement
  ```bash
  # Exemple avec rsync
  rsync -avz ./dist/ user@serveur:/chemin/vers/www/
  ```

- [ ] Configurer le serveur web (exemple avec Nginx)
  ```nginx
  # Fichier de configuration Nginx
  server {
      listen 80;
      server_name votre-domaine.com www.votre-domaine.com;
      
      location / {
          root /chemin/vers/www;
          try_files $uri $uri/ /index.html;
          
          # Mise en cache des assets statiques
          location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
              expires 30d;
              add_header Cache-Control "public, no-transform";
          }
      }
  }
  ```

## Configuration après déploiement

- [ ] Créer un compte administrateur Strapi en production
  ```
  Accédez à https://api.votre-domaine.com/admin
  ```

- [ ] Configurer les autorisations d'API publiques
  - Dans l'admin Strapi, accédez à "Settings" > "Users & Permissions Plugin" > "Roles" > "Public"
  - Activez les permissions suivantes pour "Event":
    - [x] find
    - [x] findOne

- [ ] Créer et configurer le compte utilisateur de votre cliente (voir CONFIGURATION_ACCES_CLIENT.md)

- [ ] Importer les données de développement vers la production (si nécessaire)
  ```bash
  # Copier la base de données de développement
  scp server/.tmp/data.db user@serveur:/chemin/vers/destination/.tmp/data.db
  
  # OU utiliser l'export/import JSON pour plus de flexibilité
  # En développement:
  npx strapi export --no-encrypt -f export-data.tar.gz
  
  # Transférer puis en production:
  scp export-data.tar.gz user@serveur:/chemin/vers/destination/
  cd /chemin/vers/destination
  npx strapi import -f export-data.tar.gz
  ```

- [ ] Vérifier l'interface d'administration
  - [ ] Accédez à l'interface d'administration (https://api.votre-domaine.com/admin)
  - [ ] Vérifiez que tous les types de contenu sont disponibles
  - [ ] Essayez de créer/modifier un événement

- [ ] Vérifier le site public
  - [ ] Accédez au site public (https://votre-domaine.com)
  - [ ] Vérifiez que les événements s'affichent correctement
  - [ ] Testez la navigation et les fonctionnalités principales

## Sécurité et performance

- [ ] Configurer HTTPS avec Let's Encrypt
  ```bash
  # Avec Certbot pour Nginx
  sudo apt-get install certbot python3-certbot-nginx
  sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
  sudo certbot --nginx -d api.votre-domaine.com
  ```

- [ ] Configurer un pare-feu
  ```bash
  # Exemple avec UFW
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw allow 22/tcp
  sudo ufw enable
  ```

- [ ] Mettre en place une sauvegarde automatique
  ```bash
  # Exemple de script de sauvegarde quotidienne pour SQLite
  mkdir -p /chemin/vers/backups
  
  # Créer un script backup.sh
  #!/bin/bash
  DATE=$(date +%Y%m%d)
  cp /chemin/vers/destination/.tmp/data.db /chemin/vers/backups/data-$DATE.db
  
  # Rendre exécutable et ajouter au cron
  chmod +x backup.sh
  crontab -e
  # Ajouter: 0 2 * * * /chemin/vers/backup.sh
  ```

## Finalisation

- [ ] Mettre à jour la documentation avec les liens de production
  - [ ] Mettre à jour GUIDE_CLIENT.md avec les bonnes URL
  
- [ ] Former votre cliente à l'utilisation du CMS en production
  - [ ] Organiser une session de formation
  - [ ] Parcourir l'ensemble du processus de création et publication
  
- [ ] Mettre en place une procédure de maintenance
  - [ ] Planifier des mises à jour régulières
  - [ ] Configurer des alertes de surveillance 