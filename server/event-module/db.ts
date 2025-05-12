import sqlite3 from 'sqlite3';
import path from 'path';

// Choisir l'emplacement du fichier de base de données SQLite
// Pour la simplicité, nous le mettons à la racine du projet
// Dans un projet réel, vous pourriez vouloir le mettre dans un dossier de données dédié etgitignore-le s'il n'est pas versionné
const dbPath = path.resolve(process.cwd(), 'events.db');

// Crée une instance de la base de données.
// sqlite3.verbose() peut être utile pour obtenir plus d'informations en cas de problème.
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log(`Connected to the SQLite database at ${dbPath}`);
    // Initialisation de la table des événements si elle n'existe pas
    db.run(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        description TEXT,
        location TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `, (initErr) => {
      if (initErr) {
        console.error('Error creating events table', initErr.message);
      } else {
        console.log('Events table initialized successfully.');
      }
    });
  }
});

// Export de l'instance de la base de données pour l'utiliser dans d'autres parties du module
export default db;
