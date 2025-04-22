import path from 'path';

export default ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'sqlite'),

    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
      },
    },
    debug: false,
  },
});
