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
    id: number().integer().optional(),
    filter: string().optional()
  }))
}));



export const getAll: RequestHandler<{}, {}, {}, IQueryProps> = async (req, res) => {


  const result = await CityProvider.getAll(req.query);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: result.message
        }
      });
  }


  const __result = await CityProvider.count(req.query);
  if (__result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: __result.message
        }
      });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', <number>__result);



  res.status(StatusCodes.OK)
    .json(result);

};