// server/event-module/event.service.ts
import db from './db'; // Notre instance de base de données SQLite
import { Event, CreateEventDto, UpdateEventDto } from './event.model';
import { v4 as uuidv4 } from 'uuid'; // Pour générer les ID
import * as sqlite3 from 'sqlite3'; // Importer les types sqlite3

// Étendre l'interface Statement pour inclure la propriété 'changes'
declare module 'sqlite3' {
  interface Statement {
    changes: number;
    lastID: number;
  }
}

// Fonction pour obtenir la date et l'heure actuelles au format ISO pour SQLite
// Fonction pour obtenir la date et l'heure actuelles au format ISO
const getCurrentISOTime = (): string => {
  try {
    return new Date().toISOString();
  } catch (error) {
    console.error('Erreur lors de la conversion de la date en ISO string:', error);
    // Fallback: retourner une chaîne de date formatée manuellement
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.000Z`;
  }
};

export class EventService {
  /**
   * Crée un nouvel événement dans la base de données.
   * @param eventData Données pour le nouvel événement.
   * @returns L'événement créé.
   */
  async createEvent(eventData: CreateEventDto): Promise<Event> {
    // Vérifier que tous les champs requis sont présents
    if (!eventData.titre) {
      throw new Error('Le champ titre est requis');
    }
    
    if (!eventData.description) {
      throw new Error('Le champ description est requis');
    }
    
    if (!eventData.horaire) {
      throw new Error('Le champ horaire est requis');
    }
    
    if (!eventData.lieu) {
      throw new Error('Le champ lieu est requis');
    }
    
    if (!eventData.date || !eventData.date.jour || !eventData.date.mois || !eventData.date.annee) {
      throw new Error('Les champs de date sont incomplets');
    }
    
    if (!eventData.details || !eventData.details.destination || 
        !eventData.details.activities || !eventData.details.pricing || 
        !eventData.details.registration || !eventData.details.contact || 
        !eventData.details.email || !eventData.details.practicalInfo) {
      throw new Error('Les détails de l\'\u00e9vénement sont incomplets');
    }
    
    const newEvent: Event = {
      ...eventData,
      id: uuidv4(), // Génère un ID unique
      createdAt: getCurrentISOTime(),
      updatedAt: getCurrentISOTime(),
    };

    // Convertir les objets complexes en JSON pour le stockage
    const date_json = JSON.stringify(newEvent.date);
    const details_json = JSON.stringify(newEvent.details);

    const sql = `INSERT INTO events (
      id, titre, description, horaire, lieu, date_json, image, details_json, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.run(sql, [
        newEvent.id,
        newEvent.titre,
        newEvent.description,
        newEvent.horaire,
        newEvent.lieu,
        date_json,
        newEvent.image || null, // L'image peut être null
        details_json,
        newEvent.createdAt,
        newEvent.updatedAt
      ], (err: Error | null) => {
        if (err) {
          console.error('Error creating event:', err.message);
          reject(new Error('Failed to create event'));
        } else {
          // Retourne l'objet complet de l'événement créé
          resolve(newEvent);
        }
      });
    });
  }

  /**
   * Récupère tous les événements de la base de données.
   * @returns Une liste de tous les événements.
   */
  async findAllEvents(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM events ORDER BY createdAt DESC`; // Trier par date de création, le plus récent en premier

      db.all(sql, [], (err: Error | null, rows: any[]) => {
        if (err) {
          console.error('Error finding all events:', err.message);
          reject(new Error('Failed to retrieve events'));
        } else {
          // Convertir les champs JSON en objets JavaScript
          const events = rows.map(row => {
            try {
              return {
                ...row,
                date: JSON.parse(row.date_json),
                details: JSON.parse(row.details_json),
                // Supprimer les champs JSON bruts
                date_json: undefined,
                details_json: undefined
              };
            } catch (parseError) {
              console.error('Error parsing JSON data:', parseError);
              return null;
            }
          }).filter(event => event !== null) as Event[];
          
          resolve(events);
        }
      });
    });
  }

  /**
   * Trouve un événement par son ID.
   * @param id L'ID de l'événement à trouver.
   * @returns L'événement trouvé ou null s'il n'existe pas.
   */
  async findEventById(id: string): Promise<Event | null> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM events WHERE id = ?`;

      db.get(sql, [id], (err: Error | null, row: any) => {
        if (err) {
          console.error(`Error finding event by id ${id}:`, err.message);
          reject(new Error(`Failed to retrieve event ${id}`));
        } else if (!row) {
          resolve(null); // Aucun événement trouvé
        } else {
          try {
            // Convertir les champs JSON en objets JavaScript
            const event: Event = {
              ...row,
              date: JSON.parse(row.date_json),
              details: JSON.parse(row.details_json),
              // Supprimer les champs JSON bruts
              date_json: undefined,
              details_json: undefined
            };
            resolve(event);
          } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            reject(new Error(`Failed to parse event data for ${id}`));
          }
        }
      });
    });
  }

  /**
   * Met à jour un événement existant.
   * @param id L'ID de l'événement à mettre à jour.
   * @param eventData Les données à mettre à jour.
   * @returns L'événement mis à jour ou null s'il n'existe pas.
   */
  async updateEvent(id: string, eventData: UpdateEventDto): Promise<Event | null> {
    // Vérifier d'abord si l'événement existe
    const existingEvent = await this.findEventById(id);
    if (!existingEvent) {
      return null;
    }

    // Préparer les données pour la mise à jour
    const updatedEvent = { ...existingEvent, ...eventData, updatedAt: getCurrentISOTime() };
    
    // Convertir les objets complexes en JSON pour le stockage
    const date_json = JSON.stringify(updatedEvent.date);
    const details_json = JSON.stringify(updatedEvent.details);

    // Construire la requête SQL pour la mise à jour
    const sql = `
      UPDATE events
      SET 
        titre = ?,
        description = ?,
        horaire = ?,
        lieu = ?,
        date_json = ?,
        image = ?,
        details_json = ?,
        updatedAt = ?
      WHERE id = ?
    `;
    
    const values = [
      updatedEvent.titre,
      updatedEvent.description,
      updatedEvent.horaire,
      updatedEvent.lieu,
      date_json,
      updatedEvent.image || null,
      details_json,
      updatedEvent.updatedAt,
      id
    ];

    return new Promise((resolve, reject) => {
      db.run(sql, values, async (err: Error | null) => {
        if (err) {
          console.error('Error updating event:', err.message);
          return reject(err);
        }

        // Retourner l'événement mis à jour
        resolve(updatedEvent);
      });
    });
  }

  /**
   * Supprime un événement par son ID.
   * @param id L'ID de l'événement à supprimer.
   * @returns true si la suppression a réussi, false sinon.
   */
  async deleteEvent(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM events WHERE id = ?`;
      db.run(sql, [id], function (this: sqlite3.Statement, err: Error | null) {
        if (err) {
          console.error('Error deleting event:', err.message);
          return reject(err);
        }
        // this.changes contient le nombre de lignes affectées
        resolve(this.changes > 0);
      });
    });
  }
}
