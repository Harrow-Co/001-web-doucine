// src/admin/services/eventService.js
import axios from 'axios';

// Configuration de l'URL de l'API selon l'environnement
let API_URL;

// Déterminer l'environnement d'exécution et configurer l'URL de l'API en conséquence
if (import.meta.env.DEV) {
  // En développement local, utiliser le proxy Vite configuré dans vite.config.js
  // Cela évite les problèmes CORS car les requêtes passent par le même origine
  API_URL = '/api/v2';
  console.log('Mode développement (avec proxy Vite): API_URL =', API_URL);
} 
// En production avec Netlify, utiliser le proxy configuré dans netlify.toml
else if (import.meta.env.PROD && window.location.hostname !== 'localhost') {
  // Utiliser le chemin relatif pour que le proxy Netlify fonctionne
  API_URL = '/api/v2';
  console.log('Mode production (Netlify): API_URL =', API_URL);
} 
// En production locale (npm run preview), utiliser l'URL complète depuis .env.production
else {
  API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v2';
  console.log('Mode production (local): API_URL =', API_URL);
}

const eventService = {
  /**
   * Récupère tous les événements
   * @returns {Promise<Array>} Liste des événements
   */
  async getAllEvents() {
    try {
      console.log(`Fetching events from: ${API_URL}/admin/events`);
      const response = await axios.get(`${API_URL}/admin/events`);
      console.log('Events received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      // Ajouter des informations supplémentaires pour le débogage
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'état
        // qui n'est pas dans la plage 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.error('No response received. Request details:', error.request);
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        console.error('Error setting up request:', error.message);
      }
      throw error;
    }
  },

  /**
   * Récupère un événement par son ID
   * @param {string} id ID de l'événement
   * @returns {Promise<Object>} Détails de l'événement
   */
  async getEventById(id) {
    try {
      const response = await axios.get(`${API_URL}/admin/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crée un nouvel événement
   * @param {Object} eventData Données de l'événement
   * @returns {Promise<Object>} Événement créé
   */
  async createEvent(eventData) {
    try {
      console.log('Données envoyées au serveur:', JSON.stringify(eventData, null, 2));
      
      // Vérifier que tous les champs requis sont présents
      if (!eventData.titre) {
        console.error('Erreur: Le champ titre est manquant dans les données envoyées');
      }
      
      if (!eventData.description) {
        console.error('Erreur: Le champ description est manquant dans les données envoyées');
      }
      
      if (!eventData.horaire) {
        console.error('Erreur: Le champ horaire est manquant dans les données envoyées');
      }
      
      if (!eventData.lieu) {
        console.error('Erreur: Le champ lieu est manquant dans les données envoyées');
      }
      
      if (!eventData.date || !eventData.date.jour || !eventData.date.mois || !eventData.date.annee) {
        console.error('Erreur: Les champs de date sont incomplets', eventData.date);
      }
      
      if (!eventData.details || !eventData.details.destination) {
        console.error('Erreur: Les détails de l\'\u00e9vénement sont incomplets', eventData.details);
      }
      
      const response = await axios.post(`${API_URL}/admin/events`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  /**
   * Met à jour un événement existant
   * @param {string} id ID de l'événement
   * @param {Object} eventData Données mises à jour
   * @returns {Promise<Object>} Événement mis à jour
   */
  async updateEvent(id, eventData) {
    try {
      const response = await axios.put(`${API_URL}/admin/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprime un événement
   * @param {string} id ID de l'événement à supprimer
   * @returns {Promise<boolean>} Succès de la suppression
   */
  async deleteEvent(id) {
    try {
      await axios.delete(`${API_URL}/admin/events/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      throw error;
    }
  }
};

export default eventService;
