import { Knex } from 'knex';

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'Patrick2023@!', 
      database: 'devdb',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'Patrick2023@!', 
      database: 'testdb',
    },
  },
};

export default knexConfig;
