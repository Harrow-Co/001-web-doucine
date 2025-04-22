export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      headers: '*',
      origin: ['https://association-doucine.fr', 'https://www.association-doucine.fr', 'http://localhost:8080', 'http://localhost:8081', 'http://localhost:1337', 'http://localhost:3000', 'https://doucine-website.vercel.app', 'https://doucine-website-git-main-jeangougou.vercel.app', '*'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      expose: ['Content-Type', 'Authorization', 'X-Frame-Options'],
      credentials: true,
      maxAge: 86400
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
