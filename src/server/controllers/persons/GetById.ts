import { RequestHandler } from 'express';
import { PersonsProvider } from '../../database/providers';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { number, object } from 'yup';



interface IParamsProps {
  id?: number;
}


export const getByIdValidation = validation(getSchema => ({
  params: getSchema<IParamsProps>(object().shape({
    id: number().integer().required().moreThan(0)
  }))
}));


export const getById: RequestHandler<IParamsProps> = async (req, res) => {

  const { id = 0 } = req.params;

  const result = await PersonsProvider.getById(id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: result.message
        }
      });
  }

  res.status(StatusCodes.OK).json(result);

};