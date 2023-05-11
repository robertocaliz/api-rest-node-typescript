
import { IQueryProps } from '../../../controllers/IQueryProps';
import { ICity } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';



export const getAll = async (queryProps: IQueryProps): Promise<Array<ICity> | Error> => {

  const { page = 1, limit = 10, filter = '' } = queryProps;

  try {

    const cities = await Knex.select('*')
      .from(ETableNames.cities)
      .where('name', 'like', `%${filter}%`)
      .orderBy('name')
      .limit(limit)
      .offset((page - 1) * limit);

    return cities;

  } catch (error) {
    console.log(error);
    return new Error('Error trying to get cities!');
  }

};