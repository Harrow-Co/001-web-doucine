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
const getCurrentISOTime = () => new Date().toISOString();

export class EventService {
  /**
   * Crée un nouvel événement dans la base de données.
   * @param eventData Données pour le nouvel événement.
   * @returns L'événement créé.
   */
  async createEvent(eventData: CreateEventDto): Promise<Event> {
    const newEvent: Event = {
      ...eventData,
      id: uuidv4(), // Génère un ID unique
      createdAt: getCurrentISOTime(),
      updatedAt: getCurrentISOTime(),
    };

    const sql = `INSERT INTO events (id, title, date, description, location, createdAt, updatedAt)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.run(sql, [
        newEvent.id,
        newEvent.title,
        newEvent.date,
        newEvent.description,
        newEvent.location,
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
      const sql = `SELECT * FROM events ORDER BY date DESC`; // Trier par date, le plus récent en premier

      db.all(sql, [], (err: Error | null, rows: Event[]) => {
        if (err) {
          console.error('Error finding all events:', err.message);
          reject(new Error('Failed to retrieve events'));
        } else {
          resolve(rows);
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

      db.get(sql, [id], (err: Error | null, row: Event) => {
        if (err) {
          console.error(`Error finding event by id ${id}:`, err.message);
          reject(new Error(`Failed to retrieve event ${id}`));
        } else {
          resolve(row || null); // Retourne 'row' ou 'null' si non trouvé
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
    // Filtrer les clés pour ne garder que celles définies dans eventData
    // et qui correspondent aux colonnes modifiables de la table 'events'
    const validKeys: (keyof UpdateEventDto)[] = ['title', 'description', 'date', 'location'];
    const fieldsToUpdate = Object.keys(eventData)
      .filter((key): key is keyof UpdateEventDto => validKeys.includes(key as keyof UpdateEventDto) && eventData[key as keyof UpdateEventDto] !== undefined);

    if (fieldsToUpdate.length === 0) {
      // Aucune donnée valide à mettre à jour, retourner l'événement existant sans modification
      const currentEvent = await this.findEventById(id);
      return currentEvent;
    }

    const updatedAt = new Date().toISOString();
    const setClause = fieldsToUpdate.map(key => `${key} = ?`).join(', ');
    const values = fieldsToUpdate.map(key => eventData[key as keyof UpdateEventDto]);

    const sql = `
      UPDATE events
      SET ${setClause}, updatedAt = ?
      WHERE id = ?
    `;
    const finalValues = [...values, updatedAt, id];

    return new Promise(async (resolve, reject) => {
      db.run(sql, finalValues, async (err: Error | null) => {
        if (err) {
          console.error('Error updating event:', err.message);
          return reject(err);
        }

        // Récupérer et retourner l'événement mis à jour
        try {
          const updatedEvent = await this.findEventById(id);
          resolve(updatedEvent);
        } catch (fetchError) {
          reject(fetchError);
        }
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
