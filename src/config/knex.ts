import knex, { Knex } from 'knex';
import knexConfig from '../../src/config/knexfile'; 

const environment = process.env.NODE_ENV || 'development';
const config: Knex.Config = knexConfig[environment];

if (!config) {
  throw new Error(`Unable to find database config for environment: ${environment}`);
}

const connection: Knex = knex(config);

export default connection;
