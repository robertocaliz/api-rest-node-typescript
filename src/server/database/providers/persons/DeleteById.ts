import { QueryStates } from '../../EQueryStates';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';



export const deleteById = async (id: number): Promise<void | Error> => {

  try {
    const queryState = await Knex.del()
      .from(ETableNames.persons)
      .where({ id });

    if (queryState === QueryStates.EXECUTED) return;

    return new Error('Error Trying to delete person!');

  } catch (error) {
    console.log(error);
    return new Error('Error trying to delete person!');
  }
};