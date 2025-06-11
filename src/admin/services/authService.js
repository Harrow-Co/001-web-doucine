import axios from 'axios';
import { secureAxios } from './eventService';
import { apiConfig } from '../../utils/imageUtils';

// Utiliser l'URL de l'API depuis l'utilitaire
const API_URL = apiConfig.getApiUrl();

// Configurer les intercepteurs pour l'instance secureAxios

// Intercepteur pour les requêtes - ajoute automatiquement le token d'authentification
secureAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token') || localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Intercepteur pour les réponses - gère le rafraîchissement automatique du token
secureAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    
    
    // Si l'erreur est 401 (non autorisé) et que nous n'avons pas déjà essayé de rafraîchir le token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Essayer de rafraîchir le token
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          withCredentials: true // Pour envoyer le cookie httpOnly
        });
        
        // Stocker le nouveau token d'accès
        const { accessToken } = response.data;
        localStorage.setItem('access_token', accessToken);
        
        // Mettre à jour le header et réessayer la requête originale
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return secureAxios(originalRequest);
      } catch (refreshError) {
        // Si le rafraîchissement échoue, ne pas rediriger automatiquement
        // mais seulement supprimer les tokens

        localStorage.removeItem('access_token');
        localStorage.removeItem('auth_token'); // Compatibilité avec l'ancien système
        
        // Ne pas rediriger automatiquement, laisser l'application gérer cela
        // window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

class AuthService {
  // Stocker le token d'accès dans le localStorage
  setAccessToken(token) {
    localStorage.setItem('access_token', token);
  }

  // Récupérer le token d'accès du localStorage
  getAccessToken() {
    // Vérifier d'abord le nouveau format, puis l'ancien format
    return localStorage.getItem('access_token') || localStorage.getItem('auth_token');
  }

  // Supprimer les tokens
  removeTokens() {
    // Supprimer les deux formats de token pour assurer la compatibilité
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_token');
  }

  // Pour la compatibilité avec le code existant
  setToken(token) {
    this.setAccessToken(token);
  }

  getToken() {
    return this.getAccessToken();
  }

  removeToken() {
    this.removeTokens();
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    // Vérifier les deux formats de token pour assurer la compatibilité
    return !!(this.getAccessToken() || localStorage.getItem('auth_token'));
  }

  // Configurer les headers pour les requêtes authentifiées
  getAuthHeaders() {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Connexion
  async login(username, password) {
    try {
      // Nettoyer les tokens existants avant la tentative de connexion
      this.removeTokens();
      
      // Utiliser la méthode axios standard pour maintenir la compatibilité avec le backend existant
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      
      
      
      // Vérifier le format de la réponse et s'adapter aux deux formats possibles
      const token = response.data.token || response.data.accessToken;
      const user = response.data.user || response.data;
      
      if (!token) {
        throw new Error('Token non reçu du serveur');
      }
      
      // Stocker le token dans les deux formats pour assurer la compatibilité
      localStorage.setItem('access_token', token);
      localStorage.setItem('auth_token', token); // Maintenir la compatibilité avec l'ancien système
      
      
      
      // Invalider le cache des événements lors de la connexion
      window.dispatchEvent(new CustomEvent('auth:login'));
      
      return user;
    } catch (error) {
      
      throw error;
    }
  }

  // Déconnexion
  async logout() {
    try {
      // Essayer d'appeler l'API pour invalider le refresh token côté serveur
      // Si l'endpoint n'existe pas, on continue quand même avec la déconnexion locale
      try {
        await secureAxios.post(`${API_URL}/auth/logout`, {}, {
          withCredentials: true
        });
      } catch (apiError) {
        // Si l'endpoint n'existe pas (404) ou autre erreur, on continue quand même
      }
    } catch (error) {
      
    } finally {
      // Supprimer les tokens côté client, même en cas d'erreur
      this.removeTokens();
      
      // Invalider le cache des événements lors de la déconnexion
      window.dispatchEvent(new CustomEvent('auth:logout'));
      
      // Rediriger vers la page de connexion
      // Utiliser l'API History pour la redirection
      window.location.href = '/admin/login';
    }
  }

  // Rafraîchir manuellement le token d'accès
  async refreshToken() {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
        withCredentials: true
      });
      
      const { accessToken } = response.data;
      this.setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      // Erreur lors du rafraîchissement du token
      this.logout();
      throw error;
    }
  }

  // Récupérer les informations de l'utilisateur connecté
  async getCurrentUser() {
    try {
      // Utiliser l'instance axios sécurisée avec intercepteur
      const response = await secureAxios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }
}

export default new AuthService();
