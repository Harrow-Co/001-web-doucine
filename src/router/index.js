import Vue from "vue";
import VueRouter from "vue-router";
import Evenement from "../views/Evenement.vue";
import Apropos from "../views/Apropos.vue";
import AboutUs from "../views/AboutUs.vue";
import PolitiqueConfidentialite from "../views/PolitiqueConfidentialite.vue";
import NotFound from "../views/NotFound.vue";
import Contact from '../views/Contact.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
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
    component: () => import("../views/MentionsLegales.vue"),
  },
  {
    path: "/conditions-utilisation",
    name: "ConditionsUtilisation",
    component: () => import("../views/ConditionsUtilisation.vue"),
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
    name: 'Contact',
    component: Contact
  },
  // Route 404 pour toutes les URL non définies
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
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
