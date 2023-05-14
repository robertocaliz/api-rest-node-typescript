import { RequestHandler } from 'express';
import { IQueryProps } from '../IQueryProps';
import { validation } from '../../shared/middleware';
import { number, object, string } from 'yup';
import { PersonsProvider } from '../../database/providers';
import { StatusCodes } from 'http-status-codes';



export const getAllValidation = validation(getSchema => ({
  query: getSchema<IQueryProps>(object().shape({
    page: number().integer().optional().moreThan(0),
    limit: number().integer().optional().moreThan(0),
    filter: string().optional()
  }))
}));



export const getAll: RequestHandler<{}, {}, {}, IQueryProps> = async (req, res) => {

  const persons = await PersonsProvider.getAll(req.query);
  if (persons instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: persons.message
        }
      });
  }


  const count = await PersonsProvider.count(req.query.filter);
  if (count instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: count.message
        }
      });
  }


  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);


  res.status(StatusCodes.OK).json(persons);

};