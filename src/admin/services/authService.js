import axios from 'axios';

// Configuration de l'URL de l'API selon l'environnement
let API_URL;


if (import.meta.env.DEV) {
  // En développement local, proxy Vite configuré dans vite.config.js
  API_URL = '/api/v2';
  console.log('Mode développement (avec proxy Vite): API_URL =', API_URL);
} 
// En production avec un domaine externe,directement l'URL complète de l'API
else if (import.meta.env.PROD && window.location.hostname !== 'localhost') {
  API_URL = 'https://api.association-doucine.fr/api/v2';
  console.log('Mode production (externe): API_URL =', API_URL);
} 
// En production locale (npm run preview), l'URL complète depuis .env.production
else {
  API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v2';
  console.log('Mode production (local): API_URL =', API_URL);
}

class AuthService {
  // Stocker le token dans le localStorage
  setToken(token) {
    localStorage.setItem('auth_token', token);
  }

  // Récupérer le token du localStorage
  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Supprimer le token du localStorage
  removeToken() {
    localStorage.removeItem('auth_token');
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    return !!this.getToken();
  }

  // Configurer les headers pour les requêtes authentifiées
  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Connexion
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      const { token, user } = response.data;
      this.setToken(token);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Déconnexion
  logout() {
    this.removeToken();
  }

  // Récupérer les informations de l'utilisateur connecté
  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      this.logout(); // Si le token est invalide, déconnecter l'utilisateur
      throw error;
    }
  }
}

export default new AuthService();
