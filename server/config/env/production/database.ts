import { parse } from 'pg-connection-string';

interface DatabaseConfig {
  host?: string;
  port?: string;
  database?: string;
  user?: string;
  password?: string;
}

export default ({ env }) => {
  // Si DATABASE_URL est défini, l'utiliser, sinon créer une config par défaut
  if (env('DATABASE_URL')) {
    const config: DatabaseConfig = parse(env('DATABASE_URL', ''));
    
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: config.host,
          port: config.port ? Number(config.port) : 5432,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: {
            rejectUnauthorized: false
          },
        },
        debug: false,
      },
    };
  }
  
  // Fallback pour les variables individuelles
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('PGHOST', 'localhost'),
        port: env.int('PGPORT', 5432),
        database: env('PGDATABASE', 'strapi'),
        user: env('PGUSER', 'strapi'),
        password: env('PGPASSWORD', 'strapi'),
        ssl: {
          rejectUnauthorized: false
        },
      },
      debug: false,
    },
  };
}; 