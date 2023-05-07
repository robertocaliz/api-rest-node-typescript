
import { IQueryProps } from '../../../controllers/IQueryProps';
import { ICity } from '../../models';
import { ETableNames } from '../../ETableNames';
//import { getById } from './GetById';
import { Knex } from '../../knex';



export const getAll = async (queryProps: IQueryProps): Promise<Array<ICity> | Error> => {

  const {
    page = 1,
    limit = 10,
    filter = '',
    //id = 0
  } = queryProps;


  try {

    const cities = await Knex.select('*')
      .from(ETableNames.cities)
      //.where({ id })
      .where('name', 'like', `%${filter}%`)
      .orderBy('name')
      .limit(limit)
      .offset((page - 1) * limit);


    // if (id > 0 && cities.every(city => city.id != id)) {
    //   const city = await getById(id);
    //   if (city instanceof Error) {
    //     return city;
    //   }
    //   return [...cities, city];
    // }

    return cities;

  } catch (error) {
    console.log(error);
    return new Error('Error trying to get cities!');
  }

};