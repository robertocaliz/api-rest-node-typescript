import { RequestHandler } from 'express';
import { validation } from '../../shared/middleware';
import { object, number, string } from 'yup';
import { IQueryProps } from '../IQueryProps';
import { CityProvider } from '../../database/providers';
import { StatusCodes } from 'http-status-codes';




export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(object().shape({
    page: number().integer().optional().moreThan(0),
    limit: number().integer().optional().moreThan(0),
    filter: string().optional()
  }))
}));



export const getAll: RequestHandler<{}, {}, {}, IQueryProps> = async (req, res) => {


  const cities = await CityProvider.getAll(req.query);
  if (cities instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: cities.message
        }
      });
  }


  const count = await CityProvider.count(req.query);
  if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: count.message
        }
      });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', <number>count);



  res.status(StatusCodes.OK)
    .json(cities);

};