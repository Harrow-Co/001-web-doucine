# Guide d'utilisation de Strapi pour gérer les événements DOUCINE

Ce guide vous explique comment utiliser Strapi CMS pour gérer les événements sur le site DOUCINE.

## Configuration initiale

### Démarrage du serveur Strapi

1. Ouvrez un terminal et naviguez vers le dossier du serveur:
   ```
   cd server
   ```

2. Démarrez le serveur Strapi:
   ```
   npm run develop
   ```

3. Accédez au panneau d'administration à l'adresse:
   ```
   http://localhost:1337/admin
   ```

4. Connectez-vous avec votre compte administrateur.

### Démarrage du frontend Vue.js

1. Ouvrez un nouveau terminal et naviguez vers le dossier principal du projet:
   ```
   cd doucine-website
   ```

2. Démarrez le serveur de développement:
   ```
   npm run serve
   ```

3. Accédez au site à l'adresse:
   ```
   http://localhost:8080
   ```

## Gestion des événements

### Ajouter un nouvel événement

1. Dans le panneau d'administration Strapi, cliquez sur "Content Manager" dans le menu latéral.
2. Cliquez sur "Événement" dans la section "Collection Types".
3. Cliquez sur le bouton "Créer un nouvel enregistrement".
4. Remplissez les champs requis:
   - **Titre**: Nom de l'événement
   - **Description**: Description courte de l'événement
   - **Date**: Date de l'événement
   - **Heure**: Horaire de l'événement (ex: "7h00 - 16h00")
   - **Lieu**: Emplacement de l'événement
   - **Image**: Téléchargez une image représentative de l'événement

5. Dans la section "Détails", vous pouvez ajouter des informations complémentaires:
   - **Destination**: Lieu spécifique, si applicable
   - **Contact**: Numéro de téléphone
   - **Email**: Adresse email de contact
   - **Date limite d'inscription**: Date limite pour s'inscrire

6. Pour ajouter des activités, cliquez sur "Ajouter une entrée" dans la section "Activités" et complétez les champs.

7. Pour ajouter des tarifs, cliquez sur "Ajouter une entrée" dans la section "Tarifs" et complétez les champs.

8. Pour ajouter des informations pratiques, cliquez sur "Ajouter une entrée" dans la section "Informations pratiques" et complétez les champs.

9. Une fois terminé, cliquez sur "Enregistrer" pour sauvegarder l'événement en tant que brouillon.

10. Pour rendre l'événement visible sur le site, cliquez sur le bouton "Publier".

### Modifier un événement existant

1. Dans le panneau d'administration Strapi, accédez à "Content Manager" > "Événement".
2. Cliquez sur l'événement que vous souhaitez modifier.
3. Effectuez vos modifications et cliquez sur "Enregistrer".
4. Si vous avez modifié un événement déjà publié, vous devrez cliquer sur "Publier" pour mettre à jour les modifications sur le site.

### Supprimer un événement

1. Dans le panneau d'administration Strapi, accédez à "Content Manager" > "Événement".
2. Cliquez sur l'événement que vous souhaitez supprimer.
3. Cliquez sur le bouton "Supprimer" en haut à droite.
4. Confirmez la suppression.

## Configuration des permissions

Par défaut, seuls les administrateurs peuvent gérer les événements. Pour permettre à d'autres utilisateurs de gérer les événements:

1. Dans le panneau d'administration Strapi, cliquez sur "Settings" (Paramètres) dans le menu latéral.
2. Cliquez sur "Users & Permissions Plugin" > "Roles".
3. Cliquez sur le rôle que vous souhaitez modifier (ex: "Editor").
4. Dans la section "Événement", cochez les permissions souhaitées (créer, lire, mettre à jour, supprimer).
5. Cliquez sur "Enregistrer".

## Conseils pratiques

- **Images**: Utilisez des images de bonne qualité mais optimisées pour le web (format JPEG ou WebP recommandé, taille maximale de 1 MB).
- **Informations pratiques**: Incluez toujours les informations importantes comme "Places limitées" ou "Inscription obligatoire".
- **Contact**: Assurez-vous que les informations de contact sont à jour pour chaque événement.
- **Vérification**: Après avoir publié un événement, vérifiez toujours qu'il s'affiche correctement sur le site.
- **Mise à jour**: Après un événement passé, pensez à le mettre à jour (par exemple, en ajoutant des photos de l'événement) ou à le dépublier si nécessaire.

## Résolution des problèmes courants

- **L'image ne s'affiche pas**: Vérifiez que l'image a bien été téléchargée et publiée dans la médiathèque Strapi.
- **L'événement n'apparaît pas sur le site**: Vérifiez que l'événement a bien été publié et que la date n'est pas dépassée.
- **Erreur lors de la création d'un événement**: Assurez-vous que tous les champs obligatoires sont remplis.

Pour toute autre question ou problème, contactez l'administrateur du site. 