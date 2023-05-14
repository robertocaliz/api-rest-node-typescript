import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';




export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error> => {

  try {
    const [id] = await Knex
      .insert(user)
      .into(ETableNames.users);

    return id;

  } catch (error) {
    console.log(error);
    return new Error('Error Trying to create user!');
  }

};