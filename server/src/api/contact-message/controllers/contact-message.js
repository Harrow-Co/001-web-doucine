'use strict';

/**
 * contact-message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-message.contact-message', ({ strapi }) => ({
  async create(ctx) {
    // Récupérer les données du formulaire
    const { name, email, subject, message } = ctx.request.body.data;

    // Validation simple côté serveur
    if (!name || !email || !subject || !message) {
      return ctx.badRequest('Tous les champs sont obligatoires');
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ctx.badRequest('Email invalide');
    }

    try {
      // Créer l'entrée dans la base de données
      const entity = await strapi.entityService.create('api::contact-message.contact-message', {
        data: {
          name,
          email,
          subject,
          message,
          status: 'nouveau',
          date: new Date()
        },
      });

      // Retourner une réponse succès
      return { 
        data: { 
          id: entity.id 
        },
        meta: { 
          message: "Message envoyé avec succès" 
        } 
      };
    } catch (error) {
      console.error('Erreur lors de la création du message de contact:', error);
      return ctx.internalServerError('Une erreur est survenue lors de l\'envoi du message');
    }
  }
})); 