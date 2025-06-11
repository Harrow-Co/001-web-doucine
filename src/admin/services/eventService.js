// src/admin/services/eventService.js
import axios from 'axios';
import authService from './authService';
import { apiConfig } from '../../utils/imageUtils';

// Utiliser l'URL de l'API depuis l'utilitaire
const API_URL = apiConfig.getApiUrl();

// Créer une instance axios sécurisée qui sera utilisée pour toutes les requêtes
// Cette instance sera importée par authService.js pour configurer les intercepteurs
const secureAxios = axios.create();
export { secureAxios };

// Système de cache pour les événements
const eventCache = {
  allEvents: null,         // Cache pour tous les événements
  eventDetails: {},        // Cache pour les détails des événements individuels
  lastFetchTimestamp: 0,   // Timestamp de la dernière récupération
  cacheDuration: 300000,   // Durée de validité du cache en ms (5 minutes par défaut)
  
  // Vérifier si le cache est toujours valide
  isValid() {
    return Date.now() - this.lastFetchTimestamp < this.cacheDuration && authService.isAuthenticated();
  },
  
  // Invalider le cache
  invalidate() {
    this.allEvents = null;
    this.eventDetails = {};
    this.lastFetchTimestamp = 0;
    console.log('Cache des événements invalidé');
  },
  
  // Mettre à jour le timestamp
  updateTimestamp() {
    this.lastFetchTimestamp = Date.now();
  },
  
  // Configurer la durée du cache
  setCacheDuration(seconds) {
    this.cacheDuration = seconds * 1000;
    console.log(`Durée du cache des événements définie à ${seconds} secondes`);
  }
};

// Écouter les événements d'authentification pour invalider le cache
window.addEventListener('auth:login', () => eventCache.invalidate());
window.addEventListener('auth:logout', () => eventCache.invalidate());

// Exporter le cache pour qu'il puisse être utilisé par d'autres services
export { eventCache };

const eventService = {
  /**
   * Upload une image pour un événement
   * @param {File} imageFile Fichier image à uploader
   * @returns {Promise<Object>} Chemin de l'image uploadée
   */
  async uploadEventImage(imageFile) {
    try {
      // Vérifier si l'utilisateur est authentifié
      if (!authService.isAuthenticated()) {
        throw new Error('Vous devez être connecté pour uploader une image');
      }
      
      // Vérifier que le fichier est bien une image
      if (!imageFile || !imageFile.type.startsWith('image/')) {
        throw new Error('Le fichier doit être une image valide');
      }
      
      // Créer un FormData pour l'upload
      const formData = new FormData();
      formData.append('image', imageFile);
      
      // Utiliser l'instance axios sécurisée avec gestion automatique des tokens
      const response = await secureAxios.post(`${API_URL}/admin/events/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      // En mode développement uniquement, afficher les détails de l'erreur
      if (import.meta.env.DEV) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
      }
      throw error;
    }
  },
  /**
   * Récupère tous les événements
   * @returns {Promise<Array>} Liste des événements
   */
  // Fonction pour normaliser les données d'événements et garantir un format cohérent
  _normalizeEventData(events) {
    if (!Array.isArray(events)) {
      console.error('Les données reçues ne sont pas un tableau:', events);
      return [];
    }
    
    return events.map(event => {
      // Créer une copie de l'événement pour éviter de modifier l'original
      const normalizedEvent = { ...event };
      
      // Si les données viennent de SQLite et sont dans date_json
      if (normalizedEvent.date_json && typeof normalizedEvent.date_json === 'string') {
        try {
          normalizedEvent.date = JSON.parse(normalizedEvent.date_json);
          console.log('Date récupérée depuis date_json:', normalizedEvent.date);
        } catch (e) {
          console.error('Erreur lors du parsing de date_json:', e);
        }
      }
      
      // Normaliser la date si elle existe
      if (normalizedEvent.date) {
        // Si la date est une chaîne JSON, essayer de la parser
        if (typeof normalizedEvent.date === 'string' && normalizedEvent.date.startsWith('{')) {
          try {
            normalizedEvent.date = JSON.parse(normalizedEvent.date);
            console.log('Date convertie de JSON string à objet:', normalizedEvent.date);
          } catch (e) {
            console.error('Erreur lors du parsing de la date JSON:', e);
          }
        }
        
        // Si la date est un objet mais sans les propriétés attendues, essayer de la récupérer
        if (typeof normalizedEvent.date === 'object' && 
            !(normalizedEvent.date.jour && normalizedEvent.date.mois && normalizedEvent.date.annee)) {
          
          // Vérifier si la date est dans une propriété imbriquée
          if (normalizedEvent.date.date && typeof normalizedEvent.date.date === 'object') {
            normalizedEvent.date = normalizedEvent.date.date;
            console.log('Date récupérée depuis une propriété imbriquée:', normalizedEvent.date);
          }
        }
        
        // Normaliser les noms de mois pour s'assurer qu'ils sont en minuscules
        if (normalizedEvent.date.mois) {
          // Créer une copie du mois d'origine pour le logging
          const originalMonth = normalizedEvent.date.mois;
          
          // Convertir le mois en minuscules pour la standardisation
          normalizedEvent.date.mois = normalizedEvent.date.mois.toLowerCase();
          
          // S'assurer que le mois est correctement formaté
          const moisValides = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                              'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
                              
          // Table de correspondance pour les abréviations de mois (en minuscules)
          const abreviationsMois = {
            'jan': 'janvier', 
            'fev': 'février', 'feb': 'février',
            'mar': 'mars',
            'avr': 'avril', 'apr': 'avril',
            'mai': 'mai', 'may': 'mai',
            'jun': 'juin', 'juin': 'juin',
            'jul': 'juillet', 'jui': 'juillet', 'juil': 'juillet',
            'aou': 'août', 'aug': 'août', 'aout': 'août',
            'sep': 'septembre', 'sept': 'septembre',
            'oct': 'octobre',
            'nov': 'novembre',
            'dec': 'décembre', 'déc': 'décembre'
          };
          
          if (!moisValides.includes(normalizedEvent.date.mois)) {
            // Tenter de corriger les mois mal orthographiés ou abrégés
            if (abreviationsMois[normalizedEvent.date.mois]) {
              console.log(`Correction du mois "${originalMonth}" en "${abreviationsMois[normalizedEvent.date.mois]}" pour l'événement "${normalizedEvent.titre}"`);
              normalizedEvent.date.mois = abreviationsMois[normalizedEvent.date.mois];
            } else {
              console.error(`Mois non reconnu: "${originalMonth}" pour l'événement "${normalizedEvent.titre}"`);
            }
          }
        }
        
        // S'assurer que le jour est une chaîne
        if (normalizedEvent.date.jour) {
          normalizedEvent.date.jour = normalizedEvent.date.jour.toString().padStart(2, '0');
        }
      }
      
      return normalizedEvent;
    });
  },
  
  async getAllEvents(forceRefresh = false) {
    try {
      // Vérifier si les données sont en cache et valides
      if (!forceRefresh && eventCache.allEvents && eventCache.isValid()) {
        console.log('Utilisation du cache pour les événements');
        return eventCache.allEvents;
      }
      
      // Utiliser l'instance axios sécurisée avec gestion automatique des tokens
      const response = await secureAxios.get(`${API_URL}/admin/events`);
      
      // Normaliser les données pour garantir un format cohérent
      const normalizedEvents = this._normalizeEventData(response.data);
      
      // Ajouter des propriétés calculées
      normalizedEvents.forEach(event => {
        // Ajouter la date formatée pour l'affichage
        event.formattedDate = `${event.date.jour} ${event.date.mois} ${event.date.annee}`;
      });
      
      // Mettre en cache les événements
      eventCache.allEvents = normalizedEvents;
      eventCache.updateTimestamp();
      
      return normalizedEvents;
    } catch (error) {
      // En mode développement uniquement, afficher les détails de l'erreur
      if (import.meta.env.DEV) {
        console.error('Erreur lors de la récupération des événements:', error);
        
        // Gestion détaillée des erreurs pour faciliter le débogage
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un code d'erreur
          console.error('Statut de la réponse d\'erreur:', error.response.status);
          console.error('Données de la réponse d\'erreur:', error.response.data);
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.error('Aucune réponse reçue');
        } else {
          // Une erreur s'est produite lors de la configuration de la requête
          console.error('Erreur lors de la configuration de la requête:', error.message);
        }
      }
      throw error;
    }
  },

  /**
   * Récupère un événement par son ID
   * @param {string} id ID de l'événement
   * @returns {Promise<Object>} Détails de l'événement
   */
  async getEventById(id, forceRefresh = false) {
    try {
      // Vérifier si les données sont en cache et valides
      if (!forceRefresh && eventCache.eventDetails[id] && eventCache.isValid()) {
        return eventCache.eventDetails[id];
      }
      // Utiliser l'instance axios sécurisée avec gestion automatique des tokens
      const response = await secureAxios.get(`${API_URL}/admin/events/${id}`);
      
      // Mettre en cache les détails de l'événement
      eventCache.eventDetails[id] = response.data;
      eventCache.updateTimestamp();
      
      return response.data;
    } catch (error) {
      // En mode développement uniquement, afficher les détails de l'erreur
      if (import.meta.env.DEV) {
        console.error(`Erreur lors de la récupération de l'événement ${id}:`, error);
      }
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
      // Vérifier si l'utilisateur est authentifié
      if (!authService.isAuthenticated()) {
        throw new Error('Vous devez être connecté pour créer un événement');
      }
      
      // Vérifier que tous les champs requis sont présents
      const missingFields = [];
      
      if (!eventData.titre) missingFields.push('titre');
      if (!eventData.description) missingFields.push('description');
      if (!eventData.horaire) missingFields.push('horaire');
      if (!eventData.lieu) missingFields.push('lieu');
      if (!eventData.date || !eventData.date.jour || !eventData.date.mois || !eventData.date.annee) {
        missingFields.push('date');
      }
      if (!eventData.details || !eventData.details.destination) {
        missingFields.push('details.destination');
      }
      
      // Si des champs sont manquants, lancer une erreur
      if (missingFields.length > 0) {
        throw new Error(`Champs requis manquants: ${missingFields.join(', ')}`);
      }
      
      // Utiliser l'instance axios sécurisée avec gestion automatique des tokens
      const response = await secureAxios.post(`${API_URL}/admin/events`, eventData);
      
      // Invalider le cache car un nouvel événement a été créé
      eventCache.invalidate();
      
      return response.data;
    } catch (error) {
      // En mode développement uniquement, afficher les détails de l'erreur
      if (import.meta.env.DEV) {
        console.error('Erreur lors de la création de l\'événement:', error);
      }
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
      // Vérifier si l'utilisateur est authentifié
      if (!authService.isAuthenticated()) {
        throw new Error('Vous devez être connecté pour modifier un événement');
      }
      
      // Utiliser l'instance axios sécurisée avec gestion automatique des tokens
      const response = await secureAxios.put(`${API_URL}/admin/events/${id}`, eventData);
      
      // Invalider le cache car un événement a été modifié
      eventCache.invalidate();
      
      return response.data;
    } catch (error) {
      // En mode développement uniquement, afficher les détails de l'erreur
      if (import.meta.env.DEV) {
        console.error(`Erreur lors de la mise à jour de l'événement ${id}:`, error);
      }
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
      // Vérifier si l'utilisateur est authentifié
      if (!authService.isAuthenticated()) {
        throw new Error('Vous devez être connecté pour supprimer un événement');
      }
      
      // Utiliser l'instance axios sécurisée avec gestion automatique des tokens
      await secureAxios.delete(`${API_URL}/admin/events/${id}`);
      
      // Invalider le cache car un événement a été supprimé
      eventCache.invalidate();
      
      return true;
    } catch (error) {
      // En mode développement uniquement, afficher les détails de l'erreur
      if (import.meta.env.DEV) {
        console.error(`Erreur lors de la suppression de l'événement ${id}:`, error);
      }
      throw error;
    }
  },
  
  // Méthode pour configurer la durée du cache (en secondes)
  setCacheDuration(seconds) {
    eventCache.setCacheDuration(seconds);
  }
};

export default eventService;
