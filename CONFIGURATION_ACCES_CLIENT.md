# Guide de configuration d'accès pour votre cliente

Ce document explique comment configurer un compte utilisateur pour votre cliente afin qu'elle puisse gérer les événements du site DOUCINE en toute autonomie.

## Étape 1: Configurer un compte utilisateur

1. Connectez-vous à l'interface d'administration Strapi avec votre compte développeur/administrateur:
   ```
   http://votre-domaine.com/admin
   ```
   (En développement: `http://localhost:1337/admin`)

2. Dans le menu latéral, cliquez sur **"Paramètres"** (⚙️) puis sur **"Utilisateurs et autorisations"**

3. Cliquez sur l'onglet **"Rôles"**

4. Créez un nouveau rôle "Gestionnaire de contenu" ou utilisez le rôle "Éditeur" existant:
   - Cliquez sur le rôle souhaité
   - Dans la section **"Événement"**, cochez les permissions suivantes:
     - `find` (consulter la liste des événements)
     - `findOne` (consulter un événement spécifique)
     - `create` (créer un nouvel événement)
     - `update` (modifier un événement)
     - `delete` (supprimer un événement)
     - `publish` (publier un événement)
   - Dans la section **"Upload"**, cochez les permissions suivantes:
     - `upload` (télécharger des fichiers)
     - `find` (consulter les fichiers téléchargés)
   - Cliquez sur **"Enregistrer"**

5. Créez un compte pour votre cliente:
   - Retournez à **"Paramètres"** puis cliquez sur **"Utilisateurs"**
   - Cliquez sur **"+ Inviter un nouvel utilisateur"**
   - Remplissez les informations de votre cliente:
     - Prénom et nom
     - Adresse email
     - Sélectionnez le rôle que vous avez configuré ("Éditeur" ou "Gestionnaire de contenu")
   - Cliquez sur **"Inviter l'utilisateur"**

Votre cliente recevra un email avec un lien pour définir son mot de passe et activer son compte.

## Étape 2: Personnaliser l'interface pour votre cliente

Pour simplifier l'interface pour votre cliente, vous pouvez:

1. Limiter les sections visibles:
   - Dans **"Paramètres"** > **"Panneau d'administration"** > **"Paramètres du menu"**
   - Désactivez les sections que votre cliente n'a pas besoin de voir:
     - "Générateur de types de contenu"
     - "Utilisateurs et autorisations"
     - "Paramètres"
   - Ne laissez visible que "Gestionnaire de contenu" et "Bibliothèque de médias"

2. Personnaliser la page d'accueil:
   - Dans **"Paramètres"** > **"Panneau d'administration"** > **"Message de bienvenue"**
   - Ajoutez un message d'accueil personnalisé, par exemple:
     ```
     Bienvenue dans l'interface d'administration du site DOUCINE. 
     
     Pour gérer les événements, cliquez sur "Gestionnaire de contenu" puis "Événement" dans le menu de gauche.
     
     Besoin d'aide? Consultez le guide utilisateur ou contactez-nous.
     ```

## Étape 3: Fournir les informations d'accès à votre cliente

Une fois que votre cliente a activé son compte, envoyez-lui:

1. L'URL d'accès à l'interface d'administration:
   ```
   http://votre-domaine.com/admin
   ```

2. Une copie du guide utilisateur (`GUIDE_CLIENT.md`):
   - Imprimez-le ou envoyez-le par email
   - Ou rendez-le accessible directement depuis l'interface d'administration

3. Vos coordonnées pour le support:
   - Complétez la section "Contact support technique" dans le guide client

## Étape 4: Organiser une session de formation

Pour faciliter la prise en main:

1. Planifiez une session de formation en visioconférence ou en personne
2. Parcourez ensemble le processus complet de création, modification et publication d'un événement
3. Expliquez comment télécharger et gérer les images
4. Montrez comment vérifier le résultat sur le site public

## Étape 5: Suivi et assistance

1. Après les premières utilisations, vérifiez:
   - Que votre cliente a bien compris le fonctionnement
   - Que les événements créés sont correctement formatés
   - Qu'elle n'a pas rencontré de difficultés

2. Proposez un suivi régulier pendant les premières semaines
3. Recueillez les retours pour améliorer l'interface si nécessaire

## En cas de problème

Si votre cliente perd l'accès à son compte:

1. Elle peut utiliser la fonction "Mot de passe oublié" sur la page de connexion
2. En tant qu'administrateur, vous pouvez:
   - Réinitialiser son mot de passe: **"Paramètres"** > **"Utilisateurs"** > [sélectionnez l'utilisateur] > **"Réinitialiser le mot de passe"**
   - Vérifier et ajuster ses permissions si nécessaire

## Étendre les fonctionnalités

Si votre cliente souhaite gérer d'autres types de contenus à l'avenir:

1. Créez les nouveaux types de contenus nécessaires
2. Mettez à jour les permissions de votre cliente
3. Complétez le guide utilisateur avec les nouvelles fonctionnalités 