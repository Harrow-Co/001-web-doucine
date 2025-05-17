// src/admin/services/eventService.js
import axios from 'axios';

// Utiliser la variable d'environnement pour l'URL de l'API d'événements
// Notez que nous utilisons le port 3000 pour notre nouvelle API d'événements
const API_URL = import.meta.env.VITE_EVENT_API_URL || 'http://localhost:3000/api/v2';

const eventService = {
  /**
   * Récupère tous les événements
   * @returns {Promise<Array>} Liste des événements
   */
  async getAllEvents() {
    try {
      const response = await axios.get(`${API_URL}/admin/events`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
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
