# Configuration de Strapi sur Railway

Ce document décrit les paramètres nécessaires pour déployer correctement Strapi sur Railway.

## 1. Variables d'environnement requises

Dans votre projet Railway, allez dans l'onglet "Variables" et ajoutez les variables suivantes :

```
NODE_ENV=production
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
HOST=0.0.0.0
PORT=1337
URL=https://cms.association-doucine.fr
```

### Secrets (à générer et ajouter)

```
APP_KEYS=[valeurs générées]
API_TOKEN_SALT=[valeur générée]
ADMIN_JWT_SECRET=[valeur générée]
TRANSFER_TOKEN_SALT=[valeur générée]
JWT_SECRET=[valeur générée]
```

Pour générer de nouvelles valeurs de secret, vous pouvez utiliser cette commande :
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

## 2. Configuration de la base de données

Railway fournit automatiquement la variable `DATABASE_URL` lorsque vous ajoutez un service PostgreSQL. 
Vous n'avez pas besoin de configurer manuellement les variables suivantes :
- DATABASE_HOST
- DATABASE_PORT
- DATABASE_NAME
- DATABASE_USERNAME
- DATABASE_PASSWORD

## 3. Configuration du domaine personnalisé

1. Dans l'onglet "Settings" de votre projet Railway :
   - Allez à la section "Domains"
   - Cliquez sur "Generate Domain" pour obtenir un domaine temporaire 
   - Ou configurez votre domaine personnalisé `cms.association-doucine.fr`

2. Si vous utilisez un domaine personnalisé :
   - Ajoutez un enregistrement CNAME dans votre configuration DNS pointant vers le domaine Railway
   - Ou utilisez les enregistrements A et AAAA si Railway les fournit

## 4. Paramètres de déploiement

Dans l'onglet "Settings" du service Strapi :
- **Root Directory**: `/server` (si votre code Strapi est dans ce dossier)
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

## 5. Exigences pour Railway

- Assurez-vous que le fichier `package.json` de votre projet spécifie les versions de Node.js et NPM prises en charge
- Railway déploie automatiquement lorsque vous poussez des modifications vers votre dépôt GitHub connecté

## 6. Surveillance et diagnostics

- Utilisez l'onglet "Logs" pour surveiller votre application et détecter les problèmes
- Si vous rencontrez des erreurs de mémoire, augmentez l'allocation de mémoire dans les paramètres du service

## 7. Redéploiement et maintenance

Pour forcer un redéploiement :
1. Allez sur le dashboard Railway
2. Sélectionnez votre service Strapi
3. Cliquez sur "Deploy" dans le coin supérieur droit

Pour les mises à jour de Strapi, suivez ces étapes :
1. Mettez à jour vos dépendances locales
2. Testez localement
3. Poussez les modifications vers GitHub
4. Railway redéploiera automatiquement 