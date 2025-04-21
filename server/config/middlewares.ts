export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'https://v1doucine.netlify.app',
        'http://localhost:8080',
        'http://localhost:3000',
        'https://9nywpf0b.up.railway.app',
        'https://association-doucine.fr',
        'https://www.association-doucine.fr',
        'https://api.association-doucine.fr',
        'https://cms.association-doucine.fr'
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
