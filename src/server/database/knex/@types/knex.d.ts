import { Person } from '../../models';
import { ICity } from '../../models/City';

declare module 'knex/types/tables' {
  interface Tables {
    cities: ICity;
    persons: Person;
  }
}


declare module 'knex/types/result' {
  interface Registry {
    Count: number;
  }
}