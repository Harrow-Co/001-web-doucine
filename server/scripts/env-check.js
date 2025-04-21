/**
 * Ce script affiche les variables d'environnement liées à la base de données
 * pour aider à déboguer les problèmes de connexion
 */

console.log('Vérification des variables d\'environnement:');
console.log('----------------------------------------------------------------------');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '[DÉFINI]' : '[NON DÉFINI]');
console.log('PGHOST:', process.env.PGHOST || '[NON DÉFINI]');
console.log('PGPORT:', process.env.PGPORT || '[NON DÉFINI]');
console.log('PGDATABASE:', process.env.PGDATABASE || '[NON DÉFINI]');
console.log('PGUSER:', process.env.PGUSER || '[NON DÉFINI]');
console.log('PGPASSWORD:', process.env.PGPASSWORD ? '[DÉFINI]' : '[NON DÉFINI]');

// Variables alternatives
console.log('DATABASE_HOST:', process.env.DATABASE_HOST || '[NON DÉFINI]');
console.log('DATABASE_PORT:', process.env.DATABASE_PORT || '[NON DÉFINI]');
console.log('DATABASE_NAME:', process.env.DATABASE_NAME || '[NON DÉFINI]');
console.log('DATABASE_USERNAME:', process.env.DATABASE_USERNAME || '[NON DÉFINI]');
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD ? '[DÉFINI]' : '[NON DÉFINI]');

// Afficher toutes les variables Railway
console.log('----------------------------------------------------------------------');
console.log('Variables Railway:');
Object.keys(process.env)
  .filter(key => key.startsWith('RAILWAY_') || key.includes('DATABASE') || key.includes('PG'))
  .forEach(key => {
    const value = key.includes('PASSWORD') || key.includes('SECRET') ? '[DÉFINI]' : process.env[key];
    console.log(`${key}: ${value}`);
  });
console.log('----------------------------------------------------------------------');

// Si DATABASE_URL est défini, essayons de l'analyser
let databaseUrlAvailable = false;
if (process.env.DATABASE_URL) {
  databaseUrlAvailable = true;
  try {
    const { parse } = require('pg-connection-string');
    const config = parse(process.env.DATABASE_URL);
    console.log('Analyse de DATABASE_URL:');
    console.log('Host:', config.host);
    console.log('Port:', config.port);
    console.log('Database:', config.database);
    console.log('User:', config.user);
    console.log('Password:', config.password ? '[DÉFINI]' : '[NON DÉFINI]');
    
    // Configuration automatique des variables individuelles si nécessaire
    if (!process.env.DATABASE_HOST && config.host) {
      process.env.DATABASE_HOST = config.host;
    }
    if (!process.env.DATABASE_PORT && config.port) {
      process.env.DATABASE_PORT = config.port;
    }
    if (!process.env.DATABASE_NAME && config.database) {
      process.env.DATABASE_NAME = config.database;
    }
    if (!process.env.DATABASE_USERNAME && config.user) {
      process.env.DATABASE_USERNAME = config.user;
    }
    if (!process.env.DATABASE_PASSWORD && config.password) {
      process.env.DATABASE_PASSWORD = config.password;
    }
  } catch (error) {
    console.error('Erreur lors de l\'analyse de DATABASE_URL:', error.message);
    databaseUrlAvailable = false;
  }
}

console.log('DATABASE_URL available:', databaseUrlAvailable);

// Si nous sommes sur Railway mais sans DATABASE_URL, vérifions PGHOST, etc.
if (!databaseUrlAvailable && process.env.RAILWAY_ENVIRONMENT) {
  if (process.env.PGHOST && process.env.PGDATABASE && process.env.PGUSER && process.env.PGPASSWORD) {
    console.log('Using Railway PostgreSQL environment variables (PGHOST, etc.)');
    // Configurer les variables Strapi à partir des variables PG
    process.env.DATABASE_HOST = process.env.PGHOST;
    process.env.DATABASE_PORT = process.env.PGPORT || '5432';
    process.env.DATABASE_NAME = process.env.PGDATABASE;
    process.env.DATABASE_USERNAME = process.env.PGUSER;
    process.env.DATABASE_PASSWORD = process.env.PGPASSWORD;
    process.env.DATABASE_CLIENT = 'postgres';
  } else {
    console.log('Using default database configuration');
  }
} else if (!databaseUrlAvailable) {
  console.log('Using default database configuration');
} 