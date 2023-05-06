import { ICity } from '../../models/City';

declare module 'knex/types/tables' {
  interface Tables {
    cities: ICity
  }
}