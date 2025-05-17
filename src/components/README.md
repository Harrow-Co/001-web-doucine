# Structure des composants

Ce dossier contient tous les composants Vue.js utilisés dans l'application Doucine. Les composants sont organisés en sous-dossiers thématiques pour une meilleure lisibilité et maintenance.

## Layout `/layout`
Composants pour la structure principale du site :
- `Navbar.vue` : Barre de navigation
- `TheHeader.vue` : En-tête de page
- `TheFooter.vue` : Pied de page

## Sections `/sections`
Sections principales des pages :
- `AboutContent.vue` : Contenu de la page À propos
- `BenefitsSection.vue` : Section des avantages
- `CommunityCTA.vue` : Call-to-action communautaire
- `Features.vue` : Fonctionnalités
- `HowItWorks.vue` : Comment ça marche (complet)
- `HowItWorksSection.vue` : Section explicative du fonctionnement
- `MissionSection.vue` : Section mission
- `TeamSection.vue` : Section équipe
- `TestimonialsSection.vue` : Section témoignages
- `TheHero.vue` : Section héros (bannière principale)

## Cards `/cards`
Composants de type carte :
- `TeamMemberCard.vue` : Carte de membre d'équipe
- `TestimonialCard.vue` : Carte de témoignage

## Forms `/forms`
Formulaires :
- `ContactForm.vue` : Formulaire de contact

## Common `/common`
Composants communs et utilitaires :
- Dossier `cookies` : Composants liés à la gestion des cookies

## Conventions de nommage
- Les composants de section utilisent le suffixe `Section`
- Les composants de carte utilisent le suffixe `Card`
- Les éléments principaux de layout utilisent le préfixe `The` (ex: TheHeader, TheFooter)
- Les formulaires utilisent le suffixe `Form` 