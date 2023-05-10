import { RequestHandler } from 'express';
import { IQueryProps } from '../IQueryProps';
import { validation } from '../../shared/middleware';
import { number, object, string } from 'yup';
import { PersonProvider } from '../../database/providers';
import { StatusCodes } from 'http-status-codes';




export const getAllValidation = validation(getSchema => ({
  query: getSchema<IQueryProps>(object().shape({
    page: number().integer().optional().moreThan(0),
    limit: number().integer().optional().moreThan(0),
    filter: string().optional()
  }))
}));



export const getAll: RequestHandler<{}, {}, {}, IQueryProps> = async (req, res) => {

  const persons = await PersonProvider.getAll(req.query);
  if (persons instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: persons.message
        }
      });
  }

  res.status(StatusCodes.OK).json(persons);

};