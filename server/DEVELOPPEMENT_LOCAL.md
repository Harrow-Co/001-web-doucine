# Guide de configuration de l'environnement de développement

Ce guide vous aidera à configurer votre environnement de développement pour travailler sur le projet Doucine.

## Configuration de la base de données

### Option 1 : Utiliser SQLite (recommandé pour le développement rapide)

1. Modifiez le fichier `server/.env` pour utiliser SQLite :
```
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

2. Les autres paramètres de base de données peuvent être supprimés car ils ne sont pas nécessaires pour SQLite.

### Option 2 : Utiliser PostgreSQL (recommandé pour une correspondance avec la production)

1. Installer PostgreSQL sur votre machine locale
   - Sur macOS : `brew install postgresql` et `brew services start postgresql`
   - Sur Windows : Télécharger et installer depuis [postgresql.org](https://www.postgresql.org/download/windows/)
   - Sur Linux : `sudo apt install postgresql` ou équivalent

2. Créer une base de données locale
```bash
psql -U postgres
CREATE DATABASE doucine;
CREATE USER doucine_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE doucine TO doucine_user;
\q
```

3. Configurer les variables d'environnement dans `server/.env` :
```
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=doucine
DATABASE_USERNAME=doucine_user
DATABASE_PASSWORD=votre_mot_de_passe
DATABASE_SSL=false
```

## Démarrage du serveur de développement

Pour démarrer le serveur Strapi en mode développement :

```bash
cd server
npm run develop
```

Le panneau d'administration sera accessible à l'adresse : http://localhost:1337/admin

## Connexion au serveur de développement depuis le frontend

Assurez-vous que votre fichier `.env` à la racine du projet contient :

```
VUE_APP_API_URL=http://localhost:1337
```

Puis lancez le frontend :

```bash
npm run serve
```

## En cas de problème

Si vous rencontrez des erreurs de connexion à la base de données :

1. Vérifiez que les informations de connexion sont correctes
2. Vérifiez que le service PostgreSQL est bien démarré
3. Essayez de vous connecter manuellement avec `psql` pour vérifier les identifiants 