import { QueryStates } from '../../EQueryStates';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';




export const updateById = async (city: Omit<ICity, 'id'>, id: number): Promise<void | Error> => {
  try {

    const queryState = await Knex(ETableNames.cities)
      .update(city)
      .where({ id });

    if (queryState === QueryStates.NOT_EXECUTED) {
      return new Error('Error trying to update city');
    }

  } catch (error) {
    console.log(error);
    return new Error('Error trying to update city');
  }
};