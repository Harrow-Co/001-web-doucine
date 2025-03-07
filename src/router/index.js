import Vue from "vue";
import VueRouter from "vue-router";
import Evenement from "../views/Evenement.vue";
import Apropos from "../views/Apropos.vue";
import AboutUs from "../views/AboutUs.vue";

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
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
