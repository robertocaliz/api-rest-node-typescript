import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';


export const getByEmail = async (email: string): Promise<IUser | Error> => {

  try {

    const [user] = await Knex
      .select('*')
      .from(ETableNames.users)
      .where({ email });

    return user;

  } catch (error) {
    console.log(error);
    return new Error('Error trying to get user');
  }

};