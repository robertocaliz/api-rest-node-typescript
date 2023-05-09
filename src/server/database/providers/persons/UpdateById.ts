import { QueryStates } from '../../EQueryStates';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';



export const updateById = async (person: Omit<IPerson, 'id'>, id: number): Promise<void | Error> => {

  try {

    const queryState = await Knex.from(ETableNames.persons)
      .update(person)
      .where({ id });

    if (queryState === QueryStates.EXECUTED) return;

    return new Error('Error trying to update person!');

  } catch (error) {
    console.log(error);
    return new Error('Error trying to update person!');
  }

};