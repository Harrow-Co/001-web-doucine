/**
 * Ce script affiche les variables d'environnement liées à la base de données
 * pour aider à déboguer les problèmes de connexion
 */

console.log('Vérification des variables d\'environnement pour la base de données:');
console.log('----------------------------------------------------------------------');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '[DÉFINI]' : '[NON DÉFINI]');
console.log('PGHOST:', process.env.PGHOST || '[NON DÉFINI]');
console.log('PGPORT:', process.env.PGPORT || '[NON DÉFINI]');
console.log('PGDATABASE:', process.env.PGDATABASE || '[NON DÉFINI]');
console.log('PGUSER:', process.env.PGUSER || '[NON DÉFINI]');
console.log('PGPASSWORD:', process.env.PGPASSWORD ? '[DÉFINI]' : '[NON DÉFINI]');
console.log('----------------------------------------------------------------------');

// Si DATABASE_URL est défini, essayons de l'analyser
if (process.env.DATABASE_URL) {
  try {
    const { parse } = require('pg-connection-string');
    const config = parse(process.env.DATABASE_URL);
    console.log('Analyse de DATABASE_URL:');
    console.log('Host:', config.host);
    console.log('Port:', config.port);
    console.log('Database:', config.database);
    console.log('User:', config.user);
    console.log('Password:', config.password ? '[DÉFINI]' : '[NON DÉFINI]');
  } catch (error) {
    console.error('Erreur lors de l\'analyse de DATABASE_URL:', error.message);
  }
} 