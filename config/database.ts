import path from 'path';

export default ({ env }) => {
  // Prioritize DATABASE_URL if available (deployment platforms like Heroku, Railway provide this)
  const connectionString = env('DATABASE_URL');
  
  if (connectionString) {
    // Parse the connection string for environments that provide DATABASE_URL
    const parsed = new URL(connectionString);
    
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: parsed.hostname,
          port: parseInt(parsed.port || '5432', 10),
          database: parsed.pathname.substring(1) || 'doucine',
          user: parsed.username,
          password: parsed.password,
          ssl: env.bool('DATABASE_SSL', true) ? { 
            rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false) 
          } : false,
        },
        debug: false,
      },
    };
  }
  
  // Fallback to individual environment variables
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('PGHOST', env('DATABASE_HOST', 'localhost')),
        port: env.int('PGPORT', env.int('DATABASE_PORT', 5432)),
        database: env('PGDATABASE', env('DATABASE_NAME', 'doucine')),
        user: env('PGUSER', env('DATABASE_USERNAME', 'postgres')),
        password: env('PGPASSWORD', env('DATABASE_PASSWORD', 'yourpassword')),
        ssl: env.bool('DATABASE_SSL', false),
      },
      debug: false,
    },
  };
}; 