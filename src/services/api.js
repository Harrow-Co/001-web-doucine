import { events as staticEvents } from '@/data/eventData';

// Service pour les événements avec des données statiques
export const eventService = {
  getEvents() {
    return Promise.resolve({
      data: {
        data: staticEvents
      }
    });
  },

  getEventById(id) {
    const event = staticEvents.find(e => e.id === id) || staticEvents[0];
    return Promise.resolve({
      data: {
        data: event
      }
    });
  },

  getUpcomingEvents() {
    return Promise.resolve({
      data: {
        data: staticEvents
      }
    });
  },

  getPastEvents() {
    return Promise.resolve({
      data: {
        data: []
      }
    });
  }
};

// Service pour les fonctionnalités de contact
export const contactService = {
  submitContactForm(formData) {
    // Simulation d'envoi de formulaire réussi
    return Promise.resolve({
      data: {
        success: true,
        message: "Merci pour votre message! Nous vous contacterons bientôt."
      }
    });
  }
};

// Exportation pour utilisation dans les composants
export default {
  events: eventService,
  contact: contactService
}; 