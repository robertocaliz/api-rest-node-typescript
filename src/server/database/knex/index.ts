import { knex } from 'knex';
import { development, production, test } from './Environment';
//import pg from 'pg';


// if (process.env.NODE_ENV === 'production') {
//   pg.types.setTypeParser(20, 'text', parseInt);
// }


const environments = {
  development,
  production,
  test
};


type Environment = 'development' | 'production' | 'test' | undefined;


const getEnvironment = () => {
  return environments[<Environment>process.env.NODE_ENV ?? 'development'];
};


export const Knex = knex(getEnvironment());