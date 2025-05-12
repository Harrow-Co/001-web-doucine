// server/event-module/event.model.ts

export interface Event {
  id: string;
  title: string;
  date: string; // ou Date si vous préférez le manipuler comme objet Date, mais stocké comme TEXT (ISO String)
  description?: string; // Optionnel
  location?: string; // Optionnel
  createdAt: string; // Stocké comme TEXT (ISO String)
  updatedAt: string; // Stocké comme TEXT (ISO String)
}

// Optionnel: Type pour la création d'événement (sans id, createdAt, updatedAt)
export type CreateEventDto = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

// Optionnel: Type pour la mise à jour d'événement (tous les champs sauf id, createdAt, updatedAt sont optionnels)
export type UpdateEventDto = Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>;
