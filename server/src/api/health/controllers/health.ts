/**
 * Health controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::health.health', ({ strapi }) => ({
  async check(ctx) {
    try {
      // Vérification simple de la base de données
      await strapi.db.connection.raw('SELECT 1');
      
      return ctx.body = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: 'connected'
      };
    } catch (error) {
      strapi.log.error('Health check failed', error);
      
      return ctx.badRequest('Health check failed', {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  }
})); 