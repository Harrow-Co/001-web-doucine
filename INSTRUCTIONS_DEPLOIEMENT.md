# Guide de déploiement en production

Ce document détaille les étapes nécessaires pour déployer l'application Doucine en production.

## Préparation du frontend (Vue.js)

1. **Vérification des configurations**
   - Assurez-vous que le fichier `.env.production` contient :
     ```
     VUE_APP_API_URL=https://cms.association-doucine.fr
     NODE_ENV=production
     ```

2. **Compilation pour la production**
   ```bash
   npm run build:prod
   ```
   Cette commande génère les fichiers optimisés dans le dossier `dist/`.

3. **Déploiement sur l'hébergeur (Vercel, Netlify, etc.)**
   - Option 1: Déploiement manuel
     ```bash
     # Pour Vercel
     vercel dist --prod
     
     # Pour Netlify
     netlify deploy --prod
     ```
   
   - Option 2: Configuration CI/CD
     - Connectez votre dépôt GitHub à Vercel/Netlify
     - Configurez le répertoire de build comme `dist/`
     - Définissez la commande de build comme `npm run build:prod`

## Déploiement du backend (Strapi sur Railway)

1. **Préparation des fichiers de configuration**
   - Vérifiez que les fichiers suivants sont correctement configurés :
     - `server/config/middlewares.ts` (configuration CORS)
     - `server/config/server.ts` (URL du serveur)
     - `server/config/env/production/server.ts` (configuration spécifique à la production)
     - `server/config/env/production/database.ts` (configuration PostgreSQL)

2. **Variables d'environnement sur Railway**
   Assurez-vous que les variables suivantes sont définies dans le dashboard Railway :
   - `NODE_ENV=production`
   - `DATABASE_URL` (fournie automatiquement par Railway si vous avez attaché une base PostgreSQL)
   - `DATABASE_SSL=true`
   - `DATABASE_SSL_REJECT_UNAUTHORIZED=false`
   - `HOST=0.0.0.0`
   - `PORT=1337`
   - `URL=https://cms.association-doucine.fr`
   - Tous les secrets (APP_KEYS, JWT_SECRET, etc.)

3. **Déploiement sur Railway**
   - Poussez vos modifications sur GitHub
   - Si le déploiement automatique est configuré, Railway déploiera automatiquement
   - Sinon, déclenchez un déploiement manuel depuis le dashboard Railway
   - Vérifiez les logs pour vous assurer que tout fonctionne correctement

4. **Vérification du déploiement**
   - Accédez à `https://cms.association-doucine.fr/admin` pour vérifier que l'interface d'administration Strapi est accessible
   - Testez l'API en accédant à `https://cms.association-doucine.fr/api/events`

## Vérification post-déploiement

1. **Test du site en production**
   - Naviguez sur toutes les pages du site pour s'assurer qu'elles se chargent correctement
   - Testez le formulaire de contact et vérifiez que les messages sont bien reçus dans Strapi
   - Vérifiez que les événements sont correctement affichés

2. **Surveillance et maintenance**
   - Configurez des alertes en cas de panne
   - Mettez en place une sauvegarde régulière de la base de données
   - Planifiez des mises à jour régulières des dépendances

## Résolution des problèmes courants

### Erreurs CORS
Si vous rencontrez des erreurs CORS, vérifiez :
- La configuration dans `server/config/middlewares.ts`
- Assurez-vous que l'origine de votre frontend est correctement listée
- Vérifiez que le proxy de Railway est correctement configuré

### Erreurs de base de données
Si la connexion à la base de données échoue :
- Vérifiez les variables d'environnement dans Railway
- Assurez-vous que `DATABASE_SSL=true` est défini
- Vérifiez les logs pour les erreurs spécifiques

### Problèmes de déploiement continu
Si le déploiement automatique ne fonctionne pas :
- Vérifiez les webhooks entre GitHub et Railway
- Consultez les logs de déploiement pour identifier les erreurs
- Essayez un déploiement manuel pour isoler le problème 