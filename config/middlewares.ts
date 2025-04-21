export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:1337',
        'http://localhost:8080',
        'http://localhost:3000',
        'https://v1doucine.netlify.app',
        'https://association-doucine.fr',
        'https://www.association-doucine.fr',
        'https://pg.association-doucine.fr',
        'https://cms-doucine.up.railway.app',
        'https://cms.association-doucine.fr',
        'https://pts3ft9e.up.railway.app',
        '*'
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]; 