import { QueryStates } from '../../EQueryStates';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const deleteById = async (id: number): Promise<void | Error> => {
  try {

    const queryState = await Knex(ETableNames.cities)
      .del()
      .where({ id });

    if (queryState === QueryStates.NOT_EXECUTED) {
      return new Error('Error trying to delete city!');
    }

  } catch (error) {
    console.log(error);
    return new Error('Error trying to delete city!');
  }

};