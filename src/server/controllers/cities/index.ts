import * as create from './Create';
import * as updateById from './UpdateById';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deleteById from './DeleteById';


export const CityController = {
  ...create,
  ...updateById,
  ...getAll,
  ...getById,
  ...deleteById
};


