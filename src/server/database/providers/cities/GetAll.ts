
import { IQueryProps } from '../../../controllers/IQueryProps';
import { ICity } from '../../models';
import { ETableNames } from '../../ETableNames';
import { getById } from './GetById';
import { Knex } from '../../knex';



export const getAll = async (queryProps: IQueryProps): Promise<Array<ICity> | Error> => {

  const {
    page = 1,
    limit = 10,
    filter = '',
    id = 0
  } = queryProps;


  try {

    const cities = await Knex(ETableNames.cities)
      .select('*')
      .where({ id })
      .orWhere('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);


    if (id > 0 && cities.every(city => city.id !== id)) {
      const result = await getById(id);
      if (result instanceof Error) {
        return result;
      }
      return [...cities, result];
    }

    return cities;

  } catch (error) {
    console.log(error);
    return new Error('Error trying to get cities!');
  }

};