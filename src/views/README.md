# Structure des vues (Views)

Ce dossier contient toutes les vues principales (pages) de l'application Doucine. Les vues sont organisées en sous-dossiers thématiques pour une meilleure lisibilité et maintenance.

## Main `/main`
Pages principales du site :
- `Home.vue` : Page d'accueil
- `Evenement.vue` : Page des événements
- `Contact.vue` : Page de contact
- `Apropos.vue` : Page À propos (français)
- `AboutUs.vue` : Page À propos (anglais)

## Actions `/actions`
Pages des différentes actions et services de l'association :
- `ActivitesSociales.vue` : Activités sociales
- `AteliersBienEtre.vue` : Ateliers bien-être
- `PreventionSante.vue` : Prévention santé
- `SoutienAdministratif.vue` : Soutien administratif
- `SoutienDomicile.vue` : Soutien à domicile

## Legal `/legal`
Pages d'informations légales :
- `ConditionsUtilisation.vue` : Conditions d'utilisation
- `MentionsLegales.vue` : Mentions légales
- `PolitiqueConfidentialite.vue` : Politique de confidentialité

## Errors `/errors`
Pages d'erreur :
- `NotFound.vue` : Page 404 (Page non trouvée)

## Conventions de nommage
- Les noms de fichiers sont en PascalCase
- Les pages utilisent des noms descriptifs qui reflètent leur contenu
- Les routes correspondantes sont définies dans `src/router/index.js` 