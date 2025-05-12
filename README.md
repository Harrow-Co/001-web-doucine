# DOUCINE - Site Web

Ce projet est un site web pour l'association DOUCINE.

## Structure du projet

Le projet est divisé en une partie principale :

1.  **Frontend** : Une application Vue.js qui constitue l'interface utilisateur du site

## Installation

### Prérequis

- Node.js (v14+)
- NPM ou Yarn

### Installation du frontend (Vue.js)

1.  Clonez le dépôt :
    ```bash
    git clone <url-du-depot>
    cd doucine-website
    ```
2.  Installez les dépendances :
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  Configurez les variables d'environnement :
    - Créez un fichier `.env` à partir de `.env.example`
    - Ajustez l'URL de l'API selon votre configuration

4.  Démarrez le serveur de développement :
    ```bash
    npm run serve
    # ou
    yarn serve
    ```

5.  Accédez au site à l'adresse :
    ```
    http://localhost:8080
    ```

## Utilisation

### Structure des événements

Chaque événement comprend :
- Informations de base (titre, description, date, lieu)
- Détails complémentaires (activités, tarifs, informations pratiques)
- Média associé (image)

## Déploiement en production

### Frontend

1.  Construisez l'application pour la production :
    ```bash
    npm run build
    ```

2.  Déployez le contenu du dossier `dist` sur votre serveur web

## Maintenance

### Sauvegarde

Pour sauvegarder les données :
```bash
cp ./data ./backups/data-$(date +%Y%m%d)
```

### Mises à jour

1.  Mettez à jour les dépendances régulièrement :
    ```bash
    npm update
    ```

2.  Vérifiez les mises à jour de sécurité :
    ```bash
    npm audit fix
    ```

## Documentation technique

- Documentation frontend : voir `src/README.md`
- Guide utilisateur : voir `GUIDE_CLIENT.md`

## Support

Pour toute question technique concernant cette installation, contactez :
- [Votre email/contact]

## Licence

Ce projet est configuré spécifiquement pour DOUCINE.

---
_Ce README fournit une vue d'ensemble du projet._
