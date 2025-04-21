import axios from 'axios';

// Configuration de l'instance Axios
const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL || 'http://localhost:1337'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// Méthodes pour gérer les événements
export const eventService = {
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
    // Récupérer les événements avec les champs imbriqués spécifiques
    return apiClient.get(`/events?populate[0]=image&populate[1]=details&populate[2]=details.activities&populate[3]=details.pricing&sort=date:asc`);
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