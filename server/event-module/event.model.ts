// server/event-module/event.model.ts

// Interface pour la structure de date utilisée dans eventData.js
export interface EventDate {
  jour: string;
  mois: string; // Format abrégé en majuscules (ex: 'JAN', 'FEV', 'MAR')
  annee: string;
}

// Interface pour les détails de l'événement
export interface EventDetails {
  destination: string;
  activities: string[];
  pricing: string[];
  registration: string;
  contact: string;
  email: string;
  practicalInfo: string[];
}

// Interface principale pour l'événement
export interface Event {
  id: string;
  titre: string;
  description: string;
  horaire: string;
  lieu: string;
  date: EventDate;
  image?: string; // Chemin vers l'image, optionnel car on ne peut pas facilement uploader des images via l'API
  details: EventDetails;
  createdAt: string; // Stocké comme TEXT (ISO String)
  updatedAt: string; // Stocké comme TEXT (ISO String)
}

// Type pour la création d'événement (sans id, createdAt, updatedAt)
export type CreateEventDto = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

// Type pour la mise à jour d'événement (tous les champs sauf id, createdAt, updatedAt sont optionnels)
export type UpdateEventDto = Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>;
