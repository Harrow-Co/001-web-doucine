# DOUCINE - CMS Strapi

Ce dossier contient le CMS Strapi qui gère le contenu dynamique du site DOUCINE, en particulier les événements.

## Aperçu

Cette installation Strapi:
- Gère les événements de l'association DOUCINE
- Permet aux administrateurs d'ajouter, modifier et supprimer des événements
- Expose une API REST qui alimente le frontend Vue.js

## Configuration requise

- Node.js (v14+)
- NPM ou Yarn
- Base de données SQLite (inclus) ou autre selon votre environnement de production

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Démarrer le serveur en mode développement :
```bash
npm run develop
```

3. Créer un compte administrateur au premier démarrage

4. Accéder au panneau d'administration :
```
http://localhost:1337/admin
```

## Structure des types de contenu

### Collection Type: Événement (Event)

La collection principale pour gérer les événements.

#### Champs principaux:
- **Titre** (`title`): Nom de l'événement
- **Description** (`description`): Résumé de l'événement
- **Date** (`date`): Date au format date
- **Heure** (`time`): Horaire (ex: "7h00 - 16h00")
- **Lieu** (`location`): Emplacement
- **Image** (`image`): Illustration/photo
- **Slug** (`slug`): Identifiant URL automatique
- **Détails** (`details`): Composant avec informations détaillées

#### Composants:
- **Détails de l'événement** (informations complémentaires)
- **Activités** (activités proposées)
- **Tarifs** (différents prix)
- **Informations pratiques** (consignes importantes)

## Points d'API

### Événements

- **GET /api/events** - Liste tous les événements
- **GET /api/events/:id** - Détails d'un événement spécifique
- **GET /api/events?filters[date][$gte]=YYYY-MM-DD** - Événements à venir
- **GET /api/events?populate=deep** - Événements avec toutes leurs relations

## Configuration pour la production

Pour déployer en production :

1. Configuration des variables d'environnement:
   - Créez un fichier `.env` depuis `.env.example`
   - Ajustez selon votre environnement de déploiement

2. Construire l'application admin:
```bash
npm run build
```

3. Démarrer en mode production:
```bash
npm run start
```

## Intégration avec le frontend

Le frontend Vue.js communique avec cette API Strapi via Axios. Les principaux éléments d'intégration sont:

- Service API dans `/src/services/api.js`
- Format des données adapté via la méthode `formatEvents()` dans `Evenement.vue`
- Configuration des URL via variables d'environnement dans `.env`

## Sauvegarde et restauration

Pour sauvegarder la base de données:
```bash
cp .tmp/data.db ./backups/data-$(date +%Y%m%d).db
```

Pour restaurer:
```bash
cp ./backups/your-backup.db .tmp/data.db
```

## Support

Pour toute question technique concernant cette installation, contactez:
- [Votre email/contact]

## Licence

Ce projet est configuré spécifiquement pour DOUCINE.

# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>

## Déploiement sur Railway

Ce projet est configuré pour être déployé sur Railway. Voici les étapes pour un déploiement réussi:

### Configuration de la base de données

1. Créez une base de données PostgreSQL sur Railway
2. Railway devrait injecter automatiquement la variable `DATABASE_URL` dans votre service
3. Assurez-vous que les variables d'environnement suivantes sont configurées:
   - `DATABASE_CLIENT=postgres`
   - `DATABASE_POOL_MIN=0`
   - `DATABASE_POOL_MAX=5`
   - `DATABASE_CONNECTION_TIMEOUT=60000`
   - `DATABASE_SSL_REJECT_UNAUTHORIZED=false`

### Résolution des problèmes de connexion

Si vous rencontrez l'erreur "Knex: Timeout acquiring a connection", vérifiez que:

1. La base de données PostgreSQL est accessible
2. Les paramètres de pool de connexion sont correctement configurés
3. Vérifiez les journaux de démarrage pour voir les variables d'environnement détectées

### Secrets et variables d'environnement

N'oubliez pas de générer et configurer les secrets suivants:
- `APP_KEYS` (générez avec `node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"`)
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`

Ces valeurs ne doivent jamais être partagées ou versionnées dans Git.
