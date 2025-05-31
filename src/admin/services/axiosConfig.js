// src/admin/services/axiosConfig.js
import axios from 'axios';
import authService from './authService';
import router from '../router';

// Intercepteur pour les requêtes
axios.interceptors.request.use(
  config => {
    // Ajouter le token d'authentification à toutes les requêtes si disponible
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Gérer les erreurs d'authentification (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      console.log('Session expirée ou non authentifiée');
      // Supprimer le token et rediriger vers la page de connexion
      authService.logout();
      
      // Vérifier si nous ne sommes pas déjà sur la page de connexion pour éviter une boucle
      if (router.currentRoute && router.currentRoute.name !== 'admin-login') {
        router.push({ name: 'admin-login' });
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
