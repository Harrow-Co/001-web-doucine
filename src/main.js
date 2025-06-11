// Désactiver les logs en production (doit être importé en premier)
import './utils/disableLogsInProduction';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';

import './assets/styles/main.css';

import './admin/services/axiosConfig';

const app = createApp(App);
app.use(router);
app.mount('#app');

