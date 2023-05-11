import { IQueryProps } from '../../../controllers/IQueryProps';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';




export const getAll = async (queryProps: IQueryProps): Promise<Array<IPerson> | Error> => {

  const { page = 1, limit = 10, filter = '' } = queryProps;

  try {

    const persons = await Knex.select('*')
      .from(ETableNames.persons)
      .where('fullName', 'like', `%${filter}%`)
      .orderBy('fullName')
      .limit(limit)
      .offset((page - 1) * limit);

    return persons;


  } catch (error) {
    console.log(error);
    return new Error('Error trying to get persons!');
  }

};