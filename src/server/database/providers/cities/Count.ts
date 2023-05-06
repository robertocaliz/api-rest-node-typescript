import { IQueryProps } from '../../../controllers/IQueryProps';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (queryProps: IQueryProps): Promise<number | Error> => {

  const { filter = '' } = queryProps;

  try {

    const [{ count }] = await Knex(ETableNames.cities)
      .where('name', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    return count;

  } catch (error) {
    console.log(error);
    return new Error('Error trying to get the register quantity!');
  }

};