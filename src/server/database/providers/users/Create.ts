import { PasswordCrypto } from '../../../shared/services';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';




export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error> => {

  try {

    const hash = await PasswordCrypto.getHash(user.password);

    const [{ id }] = await Knex
      .insert({ ...user, password: hash })
      .into(ETableNames.users)
      .returning('id');

    return id;

  } catch (error) {
    console.log(error);
    return new Error('Error Trying to create user!');
  }

};