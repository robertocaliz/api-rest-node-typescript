import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';




export const getById = async (id: number): Promise<IPerson | Error> => {

  try {

    const [person] = await Knex.select('*')
      .from(ETableNames.persons)
      .where({ id });

    if (person) return person;

    return new Error(`Person with id ${id} not found!`);


  } catch (error) {
    console.log(error);
    return new Error('Error trying to get person!');
  }

};