import { IPerson, ICity, IUser } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    cities: ICity;
    persons: IPerson;
    users: IUser;
  }
}


// declare module 'knex/types/result' {
//   interface Registry {
//     Count: number;
//   }
// }