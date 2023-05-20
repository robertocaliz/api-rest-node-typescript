import supertest from 'supertest';
import { Knex } from '../src/server/database/knex';
import { server } from '../src/server/server';


const runMigrations = async () => {
  await Knex.migrate.latest();
};


beforeAll(runMigrations);


const runSeeds = async () => {
  await Knex.seed.run();
};

beforeAll(runSeeds);


const createUser = async () => {
  await testServer
    .post('/sign-up')
    .send({
      name: 'Roberto Caliz',
      email: 'robertotests@gmail.com',
      password: 'testes1999'
    });
};


beforeAll(createUser);



const destroyDataBase = async () => {
  await Knex.destroy();
};


afterAll(destroyDataBase);


export const testServer = supertest(server);