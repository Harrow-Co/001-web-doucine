// src/services/eventService.js
// Service pour récupérer les événements depuis l'API

// Configuration de l'URL de l'API selon l'environnement
const API_URL = import.meta.env.VITE_API_URL || '/api/v2';

const eventService = {
  /**
   * Récupère tous les événements depuis l'API
   * @returns {Promise<Array>} Liste des événements
   */
  async getAllEvents() {
    try {
      const response = await fetch(`${API_URL}/events`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      // En cas d'erreur, on peut charger les événements depuis le fichier local comme fallback
      const { events } = await import('@/data/eventData');
      return events;
    }
  },

  /**
   * Récupère un événement spécifique par son ID
   * @param {string} id ID de l'événement
   * @returns {Promise<Object>} Détails de l'événement
   */
  async getEventById(id) {
    try {
      const response = await fetch(`${API_URL}/events/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'événement ${id}:`, error);
      // En cas d'erreur, on peut chercher l'événement dans le fichier local comme fallback
      const { events } = await import('@/data/eventData');
      return events.find(event => event.id === id);
    }
  }
};

export default eventService;
