# Structure de la Base de Données pour les Événements DOUCINE

Ce document décrit la structure de la base de données pour gérer les événements du site DOUCINE via Strapi CMS.

## Collection Type: Événement (Event)

La collection principale pour stocker les informations sur les événements.

### Champs principaux:

- **Titre** (`title`): Le nom de l'événement
- **Description** (`description`): Un résumé de l'événement
- **Date** (`date`): La date de l'événement (format date)
- **Heure** (`time`): L'horaire de l'événement (ex: "7h00 - 16h00")
- **Lieu** (`location`): L'emplacement où se déroule l'événement
- **Image** (`image`): Une image illustrant l'événement (flyer, photo)
- **Slug** (`slug`): Un identifiant URL automatiquement généré à partir du titre
- **Détails** (`details`): Composant regroupant toutes les informations détaillées

## Composants

### Détails de l'événement (event-details)

Regroupe toutes les informations détaillées sur un événement.

- **Destination** (`destination`): Lieu spécifique, si applicable
- **Activités** (`activities`): Liste des activités proposées
- **Tarifs** (`pricing`): Liste des différents tarifs
- **Date limite d'inscription** (`registration`): Date limite pour s'inscrire
- **Contact** (`contact`): Numéro de téléphone
- **Email** (`email`): Adresse email de contact
- **Informations pratiques** (`practicalInfo`): Liste d'informations pratiques importantes

### Activité (activity)

Stocke les informations sur une activité proposée lors de l'événement.

- **Nom** (`name`): Nom de l'activité
- **Description** (`description`): Description détaillée (optionnelle)

### Tarif (pricing)

Stocke les informations sur les différents tarifs.

- **Description** (`description`): Description du tarif (ex: "Adulte")
- **Montant** (`amount`): Prix (décimal)
- **Catégorie** (`category`): Catégorie de personne concernée (optionnel)
- **Inclus** (`includes`): Ce qui est inclus dans le tarif (optionnel)

### Information pratique (practical-info)

Stocke les informations pratiques importantes.

- **Information** (`info`): L'information à communiquer
- **Important** (`isImportant`): Si l'information est particulièrement importante

## Utilisation dans l'interface d'administration

1. **Créer un nouvel événement**:
   - Accédez à "Content Manager" > "Événements" > "Créer un nouvel enregistrement"
   - Remplissez les champs principaux (titre, description, date, etc.)
   - Dans la section "Détails", ajoutez les informations complémentaires
   - Ajoutez des activités, des tarifs et des informations pratiques en utilisant les boutons "Ajouter une entrée"

2. **Publier un événement**:
   - Une fois l'événement créé, appuyez sur le bouton "Publier" pour le rendre visible sur le site

3. **Modifier un événement existant**:
   - Accédez à "Content Manager" > "Événements" > cliquez sur l'événement à modifier
   - Apportez vos modifications et enregistrez
   - N'oubliez pas de republier l'événement si vous souhaitez que les modifications soient visibles

## Intégration avec le frontend

Les événements peuvent être récupérés via l'API RESTful de Strapi:

- **Tous les événements**: `GET /api/events`
- **Un événement spécifique**: `GET /api/events/:id` ou `GET /api/events?filters[slug][$eq]=nom-de-l-evenement`

Pour récupérer les relations imbriquées et les composants:

```
GET /api/events?populate=deep
```

Cette requête récupérera l'événement avec tous ses composants associés (détails, activités, tarifs, etc.). 