import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';


export const getById = async (id: number): Promise<ICity | Error> => {
  try {

    const [city] = await Knex.select('*')
      .from(ETableNames.cities)
      .where({ id });

    if (city) return city;

    return new Error(`City with id ${id}, not found!`);

  } catch (error) {
    console.log(error);
    return new Error('Error trying to get the city!');
  }
};