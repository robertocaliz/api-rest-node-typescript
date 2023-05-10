import { Knex } from 'knex';
import { IPerson } from '../models';
import { ETableNames } from '../ETableNames';




export const seed = async (knex: Knex) => {

  const [{ count }] = await knex
    .from(ETableNames.persons)
    .count<[{ count: number }]>({ count: 'fullName' });

  if (count > 0) return;

  await knex(ETableNames.persons).insert(persons);

};



const persons: Array<Omit<IPerson, 'id'>> = [

  {
    fullName: 'Roberto Caliz',
    email: 'roberto@gmail.com',
    cityId: 1
  },
  {
    fullName: 'Dalton Andre',
    email: 'dalton@gmail.com',
    cityId: 8
  },
  {
    fullName: 'Carlos Sousa',
    email: 'carlos@gmail.com',
    cityId: 2
  }
  ,
  {
    fullName: 'Edy Carlos',
    email: 'edy@gmail.com',
    cityId: 8
  }
  ,
  {
    fullName: 'Kat Sousa',
    email: 'sousa@gmail.com',
    cityId: 6
  }
  ,
  {
    fullName: 'Elton andre',
    email: 'elton@gmail.com',
    cityId: 11
  }
  ,
  {
    fullName: 'Pedro Antonio',
    email: 'pedro@gmail.com',
    cityId: 9
  }
  ,
  {
    fullName: 'Felix Eur',
    email: 'feliz@gmail.com',
    cityId: 3
  }
  ,
  {
    fullName: 'Eduardo Fum',
    email: 'eduardo@gmail.com',
    cityId: 2
  }
  ,
  {
    fullName: 'Carlos Enrique',
    email: 'enrique@gmail.com',
    cityId: 1
  }
  ,
  {
    fullName: 'Edson Cam',
    email: 'edson@gmail.com',
    cityId: 2
  }
  ,
  {
    fullName: 'Pedro antonio',
    email: 'antonio.p@gmail.com',
    cityId: 6
  }
  ,
  {
    fullName: 'Alfeu Andre',
    email: 'alfeu@gmail.com',
    cityId: 9
  }

];