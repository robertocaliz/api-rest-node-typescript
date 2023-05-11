import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (filter = ''): Promise<number | Error> => {

  try {

    const [{ count }] = await Knex
      .from(ETableNames.persons)
      .count<[{ count: number }]>('* as count')
      .where('fullName', 'like', `%${filter}%`);

    return count;

  } catch (error) {
    console.log(error);
    return new Error('Error trying to count persons!');
  }

};