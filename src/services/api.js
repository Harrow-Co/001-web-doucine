import axios from 'axios';

// Configuration de l'instance Axios avec une meilleure gestion des erreurs
const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL || 'http://localhost:1337'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000
});

// Logs de débogage pour comprendre la configuration
console.log(`API URL configurée: ${process.env.VUE_APP_API_URL || 'http://localhost:1337'}`);

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
          console.error('Détails:', response.data && response.data.error ? response.data.error : 'Pas de détails disponibles');
          break;
        case 502:
          console.error('Bad Gateway: Le serveur en amont a renvoyé une réponse invalide');
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

// Données par défaut en cas d'erreur
const defaultEvents = [
  {
    id: "fallback-1",
    titre: "Sortie au Parc (données locales)",
    description: "Sortie au parc avec activités et jeux en plein air.",
    horaire: "14h00 - 17h00",
    lieu: "Parc de Cayenne",
    date: {
      jour: "15",
      mois: "JUN",
      annee: "2025"
    },
    image: require('@/assets/images/PHOTO-2025-03-13-20-39-40.jpg'),
    details: {
      destination: "Parc de Cayenne",
      activities: ["Jeux de société", "Activités en plein air", "Goûter"],
      pricing: ["Gratuit pour les adhérents"],
      registration: "10/06/2025",
      contact: "0694 20 52 31",
      email: "doucine97351@gmail.com",
      practicalInfo: ["Apporter de l'eau", "Prévoir une tenue adaptée"]
    }
  }
];

// Méthodes pour gérer les événements
export const eventService = {
  // Vérifier la santé de l'API
  checkHealth() {
    return apiClient.get('/health')
      .catch(error => {
        console.error('Erreur lors de la vérification de santé de l\'API:', error);
        return Promise.reject(error);
      });
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
        const defaultEvent = defaultEvents.find(e => e.id === id) || defaultEvents[0];
        return Promise.resolve({ data: { data: defaultEvent } });
      });
  },

  // Récupérer les événements à venir
  getUpcomingEvents() {
    console.log("Tentative de récupération des événements à venir...");
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
    // Cette fonction retourne des données de secours en cas d'indisponibilité de l'API
    console.log("Utilisation des événements par défaut (mode fallback)");
    return Promise.resolve({
      data: {
        data: defaultEvents
      }
    });
  }
};

// Service pour les fonctionnalités de contact
export const contactService = {
  // Envoyer un formulaire de contact
  submitContactForm(formData) {
    console.log("Tentative d'envoi du formulaire de contact...");
    
    // Validation de base côté client
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      console.error("Validation du formulaire échouée: champs manquants");
      return Promise.reject({
        message: "Tous les champs sont obligatoires."
      });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.error("Validation du formulaire échouée: email invalide");
      return Promise.reject({
        message: "L'adresse email n'est pas valide."
      });
    }
    
    return apiClient.post('/contact-messages', {
      data: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      }
    })
    .catch(error => {
      console.error("Erreur lors de l'envoi du formulaire de contact:", error);
      
      // Messages d'erreur plus spécifiques selon le type d'erreur
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          return Promise.reject({
            message: "Validation échouée. Veuillez vérifier vos informations."
          });
        } else if (status === 500) {
          return Promise.reject({
            message: "Erreur serveur. Notre équipe a été notifiée."
          });
        }
      }
      
      // Message d'erreur générique pour les autres cas
      return Promise.reject({
        message: "Impossible d'envoyer votre message. Veuillez réessayer ultérieurement ou nous contacter directement par email.",
        error
      });
    });
  }
};

// Exportation pour utilisation dans les composants
export default {
  events: eventService,
  contact: contactService
}; 