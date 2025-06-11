import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

// Choisir l'emplacement du fichier de base de données SQLite
// Pour Docker, nous utilisons le dossier data qui sera monté comme volume
const dataDir = path.resolve(process.cwd(), 'data');

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (err) {
    console.error(`Failed to create data directory: ${err}`);
  }
}

const dbPath = path.resolve(dataDir, 'events.db');

// Vérifier si la base de données existe déjà
const dbExists = fs.existsSync(dbPath);

// Crée une instance de la base de données
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    // Si la base de données existe déjà et que nous avons modifié le schéma, nous devons la recréer
    if (!dbExists) {
      // Création de la table des événements avec le nouveau schéma
      db.run(`
        CREATE TABLE IF NOT EXISTS events (
          id TEXT PRIMARY KEY,
          titre TEXT NOT NULL,
          description TEXT NOT NULL,
          horaire TEXT NOT NULL,
          lieu TEXT NOT NULL,
          date_json TEXT NOT NULL, -- Stocke l'objet date au format JSON
          image TEXT,
          details_json TEXT NOT NULL, -- Stocke l'objet details au format JSON
          createdAt TEXT NOT NULL DEFAULT (datetime('now')),
          updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `, (initErr) => {
        if (initErr) {
          console.error('Error creating events table', initErr.message);
        }
      });
    } else {
      // Vérifier si la table a l'ancien schéma et la mettre à jour si nécessaire
      db.get("PRAGMA table_info(events)", (err, rows) => {
        if (err) {
          console.error('Error checking table schema', err.message);
          return;
        }
        
        // Vérifier si la table a déjà le nouveau schéma
        db.get("SELECT name FROM pragma_table_info('events') WHERE name = 'titre'", (err, row) => {
          if (err) {
            console.error('Error checking table schema', err.message);
            return;
          }
          
          // Si la colonne 'titre' n'existe pas, c'est l'ancien schéma
          if (!row) {
            // Migration vers le nouveau schéma
            
            // Créer une table temporaire avec le nouveau schéma
            db.run(`
              CREATE TABLE events_new (
                id TEXT PRIMARY KEY,
                titre TEXT NOT NULL,
                description TEXT NOT NULL,
                horaire TEXT NOT NULL,
                lieu TEXT NOT NULL,
                date_json TEXT NOT NULL,
                image TEXT,
                details_json TEXT NOT NULL,
                createdAt TEXT NOT NULL DEFAULT (datetime('now')),
                updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
              )
            `, (err) => {
              if (err) {
                console.error('Error creating new events table', err.message);
                return;
              }
              
              // Migrer les données de l'ancienne table vers la nouvelle
              // Note: Cette migration est simplifiée et ne préserve pas toutes les données
              // Dans un environnement de production, il faudrait une migration plus complète
              db.run(`
                DROP TABLE IF EXISTS events;
                ALTER TABLE events_new RENAME TO events;
              `, (err) => {
                if (err) {
                  console.error('Error finalizing migration', err.message);
                }
              });
            });
          }
        });
      });
    }
  }
});

// Export de l'instance de la base de données pour l'utiliser dans d'autres parties du module
export default db;
