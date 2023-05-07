import { IQueryProps } from '../../../controllers/IQueryProps';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (queryProps: IQueryProps): Promise<number | Error> => {

  const { filter = '' } = queryProps;

  try {

    const [{ count }] = await Knex(ETableNames.cities)
      .count({ count: 'name' })
      .where('name', 'like', `%${filter}%`);


    return <number>count;

  } catch (error) {
    console.log(error);
    return new Error('Error trying to count cities!');
  }

};