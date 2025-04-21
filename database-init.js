const { Client } = require('pg');

async function initializeDatabase() {
  try {
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
      console.log('DATABASE_URL not found, skipping initialization.');
      return;
    }

    console.log('Connecting to PostgreSQL to initialize database...');
    
    // Parse the connection string
    const parsedUrl = new URL(connectionString);
    const config = {
      host: parsedUrl.hostname,
      port: parsedUrl.port,
      database: parsedUrl.pathname.substring(1),
      user: parsedUrl.username,
      password: parsedUrl.password,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
    };

    // If database name is empty, use 'postgres'
    if (!config.database) {
      console.log('Database name not found in URL, using "postgres"');
      config.database = 'postgres';
    }

    // Connect to the database
    const client = new Client(config);
    
    try {
      await client.connect();
      console.log('Successfully connected to PostgreSQL');
      
      // Check if we're already connected to the right database
      if (config.database !== 'postgres') {
        console.log(`Already connected to the target database: ${config.database}`);
        await client.end();
        return;
      }
      
      // If we're connected to postgres, try to create the database if needed
      const targetDb = process.env.DATABASE_NAME || 'doucine';
      
      // Check if the database exists
      const dbExistsResult = await client.query(`
        SELECT 1 FROM pg_database WHERE datname = $1;
      `, [targetDb]);
      
      if (dbExistsResult.rowCount === 0) {
        console.log(`Database ${targetDb} does not exist, creating it...`);
        
        // Create the database
        await client.query(`CREATE DATABASE "${targetDb}";`);
        console.log(`Database ${targetDb} created successfully`);
      } else {
        console.log(`Database ${targetDb} already exists`);
      }
    } catch (error) {
      console.error('Database connection error:', error.message);
      // Don't exit the process on connection error, let Strapi handle it
    } finally {
      try {
        await client.end();
      } catch (endError) {
        console.error('Error ending client connection:', endError.message);
      }
      console.log('Database initialization completed');
    }
  } catch (error) {
    console.error('Database initialization error:', error.message);
    // Don't exit the process, let Strapi continue
  }
}

// Run the initialization
initializeDatabase().then(() => {
  console.log('Moving on to start Strapi...');
}).catch((err) => {
  console.error('Unhandled error in database initialization:', err);
  // Don't exit the process, let Strapi handle any startup issues
}); 