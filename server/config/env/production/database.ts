export default () => {
  // Valeurs fixes pour la base de données Railway
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: "cms-doucine.railway.internal", // RAILWAY_PRIVATE_DOMAIN
        port: 5432,
        database: "railway", // POSTGRES_DB
        user: "postgres", // POSTGRES_USER
        password: "rNrnefvSynthLZhHMDFBGvywfwWhbXvI", // POSTGRES_PASSWORD
        ssl: false, // Connexion interne qui ne nécessite pas de SSL
      },
      debug: true,
    },
  };
}; 