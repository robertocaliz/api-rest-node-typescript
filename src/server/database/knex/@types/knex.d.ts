import { IPerson } from '../../models';
import { ICity } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    cities: ICity;
    persons: IPerson;
  }
}


declare module 'knex/types/result' {
  interface Registry {
    Count: number;
  }
}