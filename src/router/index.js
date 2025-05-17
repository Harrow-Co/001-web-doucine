import { createRouter, createWebHistory } from "vue-router";
import Evenement from "../views/main/Evenement.vue";
import Apropos from "../views/main/Apropos.vue";
import AboutUs from "../views/main/AboutUs.vue";
import PolitiqueConfidentialite from "../views/legal/PolitiqueConfidentialite.vue";
import NotFound from "../views/errors/NotFound.vue";
import ContactPage from '../views/main/Contact.vue'

// Importer les routes d'administration
import adminRoutes from '../admin/router';



// Combiner les routes principales et les routes d'administration
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/main/Home.vue"),
  },
  {
    path: "/evenement",
    name: "PageEvenement",
    component: Evenement,
  },
  {
    path: "/apropos",
    name: "Apropos",
    component: Apropos,
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/politique-confidentialite",
    name: "PolitiqueConfidentialite",
    component: PolitiqueConfidentialite,
  },
  {
    path: "/mentions-legales",
    name: "MentionsLegales",
    component: () => import("../views/legal/MentionsLegales.vue"),
  },
  {
    path: "/conditions-utilisation",
    name: "ConditionsUtilisation",
    component: () => import("../views/legal/ConditionsUtilisation.vue"),
  },
  // Routes pour les actions
  {
    path: "/actions/domicile",
    name: "SoutienDomicile",
    component: () => import("../views/actions/SoutienDomicile.vue"),
  },
  {
    path: "/actions/activites",
    name: "ActivitesSociales",
    component: () => import("../views/actions/ActivitesSociales.vue"),
  },
  {
    path: "/actions/bien-etre",
    name: "AteliersBienEtre",
    component: () => import("../views/actions/AteliersBienEtre.vue"),
  },
  {
    path: "/actions/prevention",
    name: "PreventionSante",
    component: () => import("../views/actions/PreventionSante.vue"),
  },
  {
    path: "/actions/administratif",
    name: "SoutienAdministratif",
    component: () => import("../views/actions/SoutienAdministratif.vue"),
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage
  },
  
  // Ajouter les routes d'administration
  ...adminRoutes,
  
  // Route 404 pour toutes les URL non définies
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Pour l'accessibilité : remonter en haut de la page lors d'un changement de route
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
