import supertest from 'supertest';
import { Knex } from '../src/server/database/knex';
import { server } from '../src/server/server';


beforeAll(async () => {
  await Knex.migrate.latest(); // run all migrations
  await Knex.seed.run(); // run all seeds
  console.log('Created!');
});


afterAll(async () => {
  await Knex.destroy(); //Destroy connections and tables
  console.log('Destroyed!');
});


export const testServer = supertest(server);