# Guide d'ajout des événements dans Strapi

Ce guide vous explique comment ajouter vos deux événements dans le CMS Strapi pour qu'ils apparaissent sur votre site.

## Étape 1: Lancer le serveur Strapi

1. Ouvrez un terminal
2. Naviguez vers le dossier server :
   ```bash
   cd /chemin/vers/doucine-website/server
   ```
3. Démarrez le serveur Strapi :
   ```bash
   npm run develop
   ```
4. Attendez que le serveur démarre - vous verrez un message indiquant que Strapi est accessible à l'adresse suivante : [http://localhost:1337/admin](http://localhost:1337/admin)

## Étape 2: Accéder à l'interface d'administration

1. Ouvrez votre navigateur
2. Accédez à l'adresse : [http://localhost:1337/admin](http://localhost:1337/admin)
3. Connectez-vous avec vos identifiants (créés lors de la première exécution de Strapi)

## Étape 3: Ajouter le premier événement (GÉNÉR'ACTIONS – Balade en Famille)

1. Dans le menu de gauche, cliquez sur **"Gestionnaire de contenu"** (ou "Content Manager")
2. Cliquez sur **"Événement"** dans la section "Types de collection"
3. Cliquez sur le bouton **"+ Créer un nouvel enregistrement"**

4. Remplissez les informations principales :
   - **Titre** : GÉNÉR'ACTIONS – Balade en Famille
   - **Description** : Partez à la découverte de l'îlot des Caïmans à Sinnamary. Une journée en pleine nature pour observer les caïmans et partager des moments de détente en famille.
   - **Date** : 29/03/2025 (utilisez le sélecteur de date)
   - **Horaire** : 7h00 - 16h00
   - **Lieu** : Départ : Family Plaza
   
5. Téléchargez l'image :
   - Cliquez sur "Ajouter une image" dans la section Image
   - Sélectionnez ou faites glisser l'image "PHOTO-2025-03-13-20-39-40.jpg" depuis votre dossier assets/images
   - Attendez que l'image soit téléchargée

6. Dans la section Détails, remplissez :
   - **Destination** : L'îlot des Caïmans à Sinnamary
   - **Contact** : 0694 20 52 31
   - **Email** : doucine97351@gmail.com
   - **Date limite d'inscription** : 19/03/2025 (utilisez le sélecteur de date)

7. Ajoutez les activités :
   - Cliquez sur "Ajouter une entrée" dans la section Activités
   - Pour la première activité, entrez "Visite des caïmans"
   - Cliquez à nouveau sur "Ajouter une entrée"
   - Pour la deuxième activité, entrez "Détente en pleine nature"

8. Ajoutez les tarifs :
   - Cliquez sur "Ajouter une entrée" dans la section Tarifs
   - Pour le premier tarif, remplissez :
     - **Description** : Adulte
     - **Montant** : 50
     - **Catégorie** : adulte
     - **Inclus** : Restauration + Transport inclus
   - Cliquez à nouveau sur "Ajouter une entrée"
   - Pour le second tarif, remplissez :
     - **Description** : Enfant
     - **Montant** : 30
     - **Catégorie** : enfant
     - **Inclus** : Restauration + Transport inclus

9. Ajoutez les informations pratiques :
   - Cliquez sur "Ajouter une entrée" dans la section Informations pratiques
   - Ajoutez "Inscription obligatoire"
   - Cliquez à nouveau sur "Ajouter une entrée" 
   - Ajoutez "Places limitées"

10. Cliquez sur **"Enregistrer"**
11. Cliquez sur **"Publier"** pour rendre l'événement visible sur le site

## Étape 4: Ajouter le deuxième événement (GÉNÉR'ACTION – Bien-Être)

1. Retournez à la liste des événements en cliquant sur "Retour" en haut à gauche
2. Cliquez à nouveau sur **"+ Créer un nouvel enregistrement"**

3. Remplissez les informations principales :
   - **Titre** : GÉNÉR'ACTION – Bien-Être
   - **Description** : Une journée dédiée au bien-être avec divers ateliers pour prendre soin de vous et apprendre des techniques à pratiquer au quotidien.
   - **Date** : 26/04/2025 (utilisez le sélecteur de date)
   - **Horaire** : 8h30 - 16h00
   - **Lieu** : Maison des Associations de Cogneau-Lamirande
   
4. Téléchargez l'image :
   - Cliquez sur "Ajouter une image" dans la section Image
   - Sélectionnez ou faites glisser l'image "IMG_8170.jpg" depuis votre dossier assets/images
   - Attendez que l'image soit téléchargée

5. Dans la section Détails, remplissez :
   - **Contact** : 0694 20 52 31
   - **Email** : doucine97351@gmail.com
   - **Date limite d'inscription** : 25/04/2025 (utilisez le sélecteur de date)

6. Ajoutez les activités :
   - Cliquez sur "Ajouter une entrée" dans la section Activités
   - Ajoutez successivement les activités suivantes (en cliquant sur "Ajouter une entrée" entre chaque) :
     - "Réflexologie"
     - "Atelier d'auto massage"
     - "Atelier sur les sens"
     - "Atelier créatif et détente"

7. Ajoutez le tarif :
   - Cliquez sur "Ajouter une entrée" dans la section Tarifs
   - Remplissez :
     - **Description** : Tarif unique
     - **Montant** : 15
     - **Inclus** : Repas et collation inclus

8. Ajoutez les informations pratiques :
   - Cliquez sur "Ajouter une entrée" dans la section Informations pratiques
   - Ajoutez "Inscription obligatoire"
   - Cliquez à nouveau sur "Ajouter une entrée" 
   - Ajoutez "Places limitées"

9. Cliquez sur **"Enregistrer"**
10. Cliquez sur **"Publier"** pour rendre l'événement visible sur le site

## Étape 5: Vérifier les événements sur le site

1. Ouvrez un nouveau terminal (sans fermer celui qui exécute Strapi)
2. Naviguez vers le dossier principal du projet :
   ```bash
   cd /chemin/vers/doucine-website
   ```
3. Démarrez le serveur de développement frontend :
   ```bash
   npm run serve
   ```
4. Accédez à l'URL indiquée (généralement [http://localhost:8080](http://localhost:8080))
5. Naviguez vers la page "Événements"
6. Vérifiez que vos deux événements apparaissent correctement avec toutes leurs informations

## Remarque

Ces événements sont maintenant stockés dans la base de données SQLite de Strapi. Si vous déployez votre site sur un serveur de production, vous devrez soit :

1. Recréer ces événements dans l'environnement de production
2. Ou exporter/importer la base de données de développement vers la production

Pour des détails sur le déploiement, consultez le fichier CHECKLIST_DEPLOIEMENT.md 