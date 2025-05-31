// src/admin/services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
