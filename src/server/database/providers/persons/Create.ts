import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';



export const create = async (person: Omit<IPerson, 'id'>): Promise<number | Error> => {

  try {
    const [id] = await Knex
      .insert(person)
      .into(ETableNames.persons);

    return id;

  } catch (error) {
    console.log(error);
    return new Error('Error trying to create person!');
  }
};