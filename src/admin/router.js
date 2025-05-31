// src/admin/router.js
import AdminDashboard from './views/AdminDashboard.vue';
import EventList from './views/EventList.vue';
import EventForm from './views/EventForm.vue';
import EventDetails from './views/EventDetails.vue';
import Login from './views/auth/Login.vue';
import authService from './services/authService';

// Middleware de navigation pour vérifier l'authentification
const requireAuth = (to, from, next) => {
  if (!authService.isAuthenticated()) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    next({ name: 'admin-login' });
  } else {
    // Continuer si l'utilisateur est authentifié
    next();
  }
};

// Routes pour la section admin
const adminRoutes = [
  // Route de connexion (accessible sans authentification)
  {
    path: '/admin/login',
    name: 'admin-login',
    component: Login,
    meta: { title: 'Connexion Admin' }
  },
  // Routes protégées par authentification
  {
    path: '/admin',
    component: AdminDashboard,
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        redirect: { name: 'admin-events' }
      },
      {
        path: 'events',
        name: 'admin-events',
        component: EventList,
        meta: { title: 'Gestion des Événements' }
      },
      {
        path: 'events/create',
        name: 'admin-event-create',
        component: EventForm,
        meta: { title: 'Créer un Événement' }
      },
      {
        path: 'events/:id',
        name: 'admin-event-details',
        component: EventDetails,
        props: true,
        meta: { title: 'Détails de l\'Événement' }
      },
      {
        path: 'events/:id/edit',
        name: 'admin-event-edit',
        component: EventForm,
        props: true,
        meta: { title: 'Modifier l\'Événement' }
      }
    ]
  }
];

export default adminRoutes;
