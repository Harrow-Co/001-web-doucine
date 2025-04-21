// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Health check endpoint pour Railway
    strapi.server.routes({
      method: 'GET',
      path: '/api/health',
      handler: (ctx) => {
        ctx.body = {
          status: 'ok',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV,
          railway: {
            environment: process.env.RAILWAY_ENVIRONMENT,
            service: process.env.RAILWAY_SERVICE_NAME,
          }
        };
      },
      config: {
        auth: false,
      },
    });

    // Afficher des informations sur la base de données au démarrage
    try {
      const dbConfig = strapi.config.get('database.connection');
      console.log('Base de données:', {
        client: dbConfig.client,
        host: dbConfig.connection.host || '(via connectionString)',
        database: dbConfig.connection.database || '(via connectionString)',
        poolMin: dbConfig.pool?.min,
        poolMax: dbConfig.pool?.max,
      });
    } catch (error) {
      console.error('Erreur lors de l\'affichage de la configuration DB:', error.message);
    }
  },
};
