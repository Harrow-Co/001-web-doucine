import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

// Choisir l'emplacement du fichier de base de données SQLite pour l'authentification
// Pour la simplicité, nous le mettons à la racine du projet
// Remonter d'un niveau si nous sommes dans le dossier server
const rootDir = process.cwd().endsWith('/server') ? path.resolve(process.cwd(), '..') : process.cwd();
const dbPath = path.resolve(rootDir, 'auth.db');

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
