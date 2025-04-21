import axios from 'axios';

// Configuration de l'instance Axios
const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL || 'http://localhost:1337'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000
});

// Méthodes pour gérer les événements
export const eventService = {
  // Vérifier la santé de l'API
  checkHealth() {
    return apiClient.get('/health');
  },

  // Récupérer tous les événements
  getEvents() {
    return apiClient.get('/events?populate=*');
  },

  // Récupérer un événement par son ID
  getEventById(id) {
    return apiClient.get(`/events/${id}?populate=*`);
  },

  // Récupérer les événements à venir
  getUpcomingEvents() {
    const today = new Date().toISOString().split('T')[0];
    console.log("Today's date for filtering:", today);
    console.log("API URL being called:", `${process.env.VUE_APP_API_URL}/api/events?populate[0]=image&populate[1]=details&populate[2]=details.activities&populate[3]=details.pricing&sort=date:asc`);
    
    // Tentative avec le nouveau format Strapi v5
    try {
      return apiClient.get(`/events?populate[0]=image&populate[1]=details&populate[2]=details.activities&populate[3]=details.pricing&sort=date:asc`);
    } catch (error) {
      console.error("Error with standard call, trying fallback:", error);
      return this.getDefaultEvents();
    }
  },

  // Récupérer les événements passés
  getPastEvents() {
    const today = new Date().toISOString().split('T')[0];
    return apiClient.get(`/events?populate=*&filters[date][$lt]=${today}&sort=date:desc`);
  },
  
  // Obtenir des événements par défaut (pour développement ou quand l'API n'est pas disponible)
  getDefaultEvents() {
    // Cette fonction simule une réponse d'API vide
    return Promise.resolve({
      data: {
        data: []
      }
    });
  }
};

// Exportation pour utilisation dans les composants
export default {
  events: eventService
}; 