import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

// Choisir l'emplacement du fichier de base de données SQLite pour l'authentification
// Pour Docker, nous utilisons le dossier data qui sera monté comme volume
const dataDir = path.resolve(process.cwd(), 'data');

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`Created data directory at ${dataDir}`);
  } catch (err) {
    console.error(`Failed to create data directory: ${err}`);
  }
}

const dbPath = path.resolve(dataDir, 'auth.db');
console.log(`Auth database path: ${dbPath}`);

// Vérifier si la base de données existe déjà
const dbExists = fs.existsSync(dbPath);

// Crée une instance de la base de données
const authDb = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening auth database', err.message);
  } else {
    console.log(`Connected to the Auth SQLite database at ${dbPath}`);
    
    // Si la base de données n'existe pas, créer la table des utilisateurs
    if (!dbExists) {
      // Création de la table des utilisateurs
      authDb.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
          createdAt TEXT NOT NULL DEFAULT (datetime('now')),
          updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `, (initErr) => {
        if (initErr) {
          console.error('Error creating users table', initErr.message);
        } else {
          console.log('Users table initialized successfully.');
        }
      });
    }
  }
});

// Export de l'instance de la base de données pour l'utiliser dans d'autres parties du module
export default authDb;
