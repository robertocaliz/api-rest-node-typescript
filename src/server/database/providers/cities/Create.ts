
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';


export const create = async (city: Omit<ICity, 'id'>): Promise<number | Error> => {

  try {

    const [id] = await Knex.insert(city)
      .into(ETableNames.cities);

    return id;

  } catch (error) {
    console.log(error);
    return new Error('Error trying to create city.');
  }

};