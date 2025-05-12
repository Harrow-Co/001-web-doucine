// src/admin/router.js
import AdminDashboard from './views/AdminDashboard.vue';
import EventList from './views/EventList.vue';
import EventForm from './views/EventForm.vue';
import EventDetails from './views/EventDetails.vue';

// Routes pour la section admin
const adminRoutes = [
  {
    path: '/admin',
    component: AdminDashboard,
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
