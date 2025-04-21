# Guide de déploiement Strapi sur Railway

Ce guide vous aidera à déployer votre application Strapi sur Railway afin que votre cliente puisse y accéder.

## Prérequis

- Un compte [Railway](https://railway.app/)
- Un compte GitHub (pour connecter votre dépôt)

## Étapes de déploiement

### 1. Téléchargez le CLI Railway (optionnel mais recommandé)

```bash
npm i -g @railway/cli
```

### 2. Connectez-vous à Railway via le CLI

```bash
railway login
```

### 3. Déployez le projet

#### Option 1: Avec GitHub

1. Poussez votre code sur GitHub
2. Connectez-vous à [Railway Dashboard](https://railway.app/dashboard)
3. Cliquez sur "New Project" > "Deploy from GitHub repo"
4. Sélectionnez votre dépôt
5. Sélectionnez le dossier "server" comme sous-dossier de déploiement

#### Option 2: Avec le CLI Railway (à partir du dossier server)

```bash
cd server
railway init
railway link # si le projet existe déjà sur Railway
railway up
```

### 4. Configuration des variables d'environnement

Dans le dashboard Railway, allez dans la section "Variables" et ajoutez les variables suivantes:

```
HOST=0.0.0.0
PORT=0
NODE_ENV=production
DATABASE_CLIENT=postgres # Railway va fournir automatiquement la DATABASE_URL

# Générez ces clés de sécurité (vous pouvez utiliser: https://generate-secret.vercel.app/32)
APP_KEYS=clé1,clé2
API_TOKEN_SALT=votre_salt
ADMIN_JWT_SECRET=votre_secret
TRANSFER_TOKEN_SALT=votre_salt
JWT_SECRET=votre_secret_jwt
```

Railway configurera automatiquement la variable `DATABASE_URL` pour PostgreSQL.

### 5. Ajouter un service PostgreSQL

1. Dans le dashboard Railway, allez dans votre projet
2. Cliquez sur "New Service" > "Database" > "PostgreSQL"
3. Railway connectera automatiquement la base de données à votre application Strapi

### 6. Accès à l'application

Une fois le déploiement terminé, vous pourrez accéder à:

- L'API Strapi: `https://votre-nom-de-projet.railway.app/api`
- Le panneau d'administration: `https://votre-nom-de-projet.railway.app/admin`

### 7. Configuration du premier utilisateur administrateur

Lors de la première visite du panneau d'administration, vous serez invité à créer un compte administrateur.

### 8. Remplissage de la base de données (si nécessaire)

Si vous devez migrer des données depuis votre environnement de développement, vous pouvez utiliser les fonctionnalités d'exportation/importation de Strapi ou créer un script de migration personnalisé.

## Résolution des problèmes courants

- **Erreur de mémoire**: Si vous rencontrez des erreurs de mémoire, ajustez les paramètres de ressources dans Railway
- **Problèmes de connexion à la base de données**: Vérifiez que les variables d'environnement sont correctement configurées
- **Problèmes avec les images/fichiers**: Envisagez de configurer un fournisseur de stockage externe comme AWS S3 pour les médias (voir documentation Strapi)

## Notes importantes

- Railway offre un niveau gratuit limité, après quoi vous serez facturé en fonction de votre utilisation
- Surveillez votre utilisation des ressources dans le tableau de bord Railway
- Configurez des sauvegardes régulières de votre base de données via Railway 