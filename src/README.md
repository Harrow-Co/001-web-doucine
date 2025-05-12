# DOUCINE - Site Web avec CMS

Ce projet est un site web pour l'association DOUCINE avec un CMS intégré pour gérer le contenu dynamique, en particulier les événements.

## Architecture

Le projet se compose de deux parties principales :

1. **Frontend** : Une application Vue.js qui constitue l'interface utilisateur du site
2. **Backend** : Un CMS Strapi qui gère le contenu et expose une API REST

## Installation

### Prérequis

- Node.js (v14+)
- NPM ou Yarn

### Installation du backend (Strapi)

1. Naviguez vers le dossier du serveur :
```bash
cd server
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur Strapi en mode développement :
```bash
npm run develop
```

4. Créez un compte administrateur lors du premier démarrage

5. Accédez au panneau d'administration à l'adresse :
```
http://localhost:1337/admin
```

### Installation du frontend (Vue.js)

1. À la racine du projet, installez les dépendances :
```bash
npm install
```

2. Configurez les variables d'environnement :
- Créez un fichier `.env` à partir de `.env.example`
- Ajustez l'URL de l'API selon votre configuration

3. Démarrez le serveur de développement :
```bash
npm run serve
```

4. Accédez au site à l'adresse :
```
http://localhost:8080
```

## Utilisation

### Gestion du contenu (pour les administrateurs)

Le CMS Strapi permet de gérer :
- Les événements (ajout, modification, suppression)
- Les médias (images)

Consultez le guide administrateur dans `GUIDE_CLIENT.md` pour des instructions détaillées.

### Structure des événements

Chaque événement comprend :
- Informations de base (titre, description, date, lieu)
- Détails complémentaires (activités, tarifs, informations pratiques)
- Média associé (image)

## Déploiement en production

### Frontend

1. Construisez l'application pour la production :
```bash
npm run build
```

2. Déployez le contenu du dossier `dist` sur votre serveur web

### Backend (Strapi)

1. Dans le dossier `server`, configurez les variables d'environnement pour la production

2. Construisez l'application admin :
```bash
npm run build
```

3. Démarrez en mode production :
```bash
npm run start
```

## Maintenance

### Sauvegarde

Pour sauvegarder la base de données du CMS :
```bash
cd server
cp .tmp/data.db ./backups/data-$(date +%Y%m%d).db
```

### Mises à jour

1. Mettez à jour les dépendances régulièrement :
```bash
npm update
```

2. Vérifiez les mises à jour de sécurité :
```bash
npm audit fix
```

## Documentation technique

- Documentation frontend : voir `src/README.md`
- Documentation backend : voir `server/README.md`
- Guide utilisateur : voir `GUIDE_CLIENT.md`
- Structure de la base de données : voir `server/EVENT_DB_SCHEMA.md`

## Support

Pour toute question technique concernant cette installation, contactez :
- [Votre email/contact]

## Licence

Ce projet est configuré spécifiquement pour DOUCINE.