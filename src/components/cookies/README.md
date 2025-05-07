# Système de Gestion des Cookies

Ce dossier contient les composants et la logique liés à la gestion des cookies pour le site Doucine.

## Structure

- `CookieConsent.vue` : Composant principal de gestion du consentement aux cookies

## Fonctionnalités

Le système de gestion des cookies permet de :
- Gérer le consentement des utilisateurs pour différents types de cookies
- Stocker les préférences des utilisateurs
- Initialiser les services en fonction des préférences

## Types de Cookies

1. **Cookies Essentiels**
   - Nécessaires au fonctionnement du site
   - Toujours activés

2. **Cookies Fonctionnels**
   - Mémorisation des préférences
   - Requiert le consentement

3. **Cookies Analytiques**
   - Analyse de l'utilisation du site
   - Requiert le consentement

4. **Cookies Marketing**
   - Publicités personnalisées
   - Requiert le consentement

## Stockage

Les préférences sont stockées dans le localStorage du navigateur avec la clé `cookie-consent`.

## Conformité RGPD

Le système est conçu pour être conforme au RGPD en :
- Demandant le consentement explicite
- Permettant la modification des préférences
- Fournissant des informations claires sur l'utilisation des cookies

## Utilisation

Pour réactiver le système de cookies, il faudra :
1. Importer le composant `CookieConsent` dans `App.vue`
2. Ajouter le composant dans le template
3. Implémenter les méthodes de gestion des cookies dans `App.vue`
4. Ajouter le bouton de paramètres dans le footer 