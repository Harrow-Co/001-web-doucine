import axios from 'axios';

// Configuration de l'instance Axios avec une meilleure gestion des erreurs
const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL || 'http://localhost:1337'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000
});

// Intercepteurs pour la gestion globale des erreurs
apiClient.interceptors.response.use(
  response => response, 
  error => {
    const { response } = error;
    
    if (response && response.status) {
      console.error(`API Error ${response.status}: `, response.data);
      
      // Messages d'erreur personnalisés selon le code HTTP
      switch (response.status) {
        case 401: 
          console.error('Non autorisé: Authentification requise');
          break;
        case 403:
          console.error('Accès refusé: Permissions insuffisantes');
          break;
        case 404:
          console.error('Ressource non trouvée');
          break;
        case 500:
          console.error('Erreur serveur interne');
          break;
        default:
          console.error(`Erreur ${response.status}`);
      }
    } else {
      console.error('Erreur réseau: Le serveur est peut-être indisponible');
    }
    
    return Promise.reject(error);
  }
);

// Méthodes pour gérer les événements
export const eventService = {
  // Vérifier la santé de l'API
  checkHealth() {
    return apiClient.get('/health');
  },

  // Récupérer tous les événements
  getEvents() {
    return apiClient.get('/events?populate=*')
      .catch(error => {
        console.error('Erreur lors de la récupération des événements:', error);
        return this.getDefaultEvents();
      });
  },

  // Récupérer un événement par son ID
  getEventById(id) {
    return apiClient.get(`/events/${id}?populate=*`)
      .catch(error => {
        console.error(`Erreur lors de la récupération de l'événement ${id}:`, error);
        return Promise.reject(error);
      });
  },

  // Récupérer les événements à venir
  getUpcomingEvents() {
    // Get upcoming or today's events
    return apiClient.get(`/events?populate[0]=image&populate[1]=details&populate[2]=details.activities&populate[3]=details.pricing&sort=date:asc`)
      .catch(error => {
        console.error("Erreur avec l'appel standard, tentative de repli:", error);
        // Essayez un format de requête plus simple en cas d'échec
        return apiClient.get(`/events?populate=*&sort=date:asc`)
          .catch(fallbackError => {
            console.error("Erreur avec l'appel de repli:", fallbackError);
            return this.getDefaultEvents();
          });
      });
  },

  // Récupérer les événements passés
  getPastEvents() {
    const today = new Date().toISOString().split('T')[0];
    return apiClient.get(`/events?populate=*&filters[date][$lt]=${today}&sort=date:desc`)
      .catch(error => {
        console.error("Erreur lors de la récupération des événements passés:", error);
        return this.getDefaultEvents();
      });
  },
  
  // Obtenir des événements par défaut (pour développement ou quand l'API n'est pas disponible)
  getDefaultEvents() {
    // Cette fonction simule une réponse d'API vide
    console.log("Utilisation des événements par défaut (mode fallback)");
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