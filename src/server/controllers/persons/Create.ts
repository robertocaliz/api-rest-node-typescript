import { RequestHandler } from 'express';
import { IPerson } from '../../database/models';
import { validation } from '../../shared/middleware';
import { number, object, string } from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PersonsProvider } from '../../database/providers';



interface IBodyProps extends Omit<IPerson, 'id'> { }



export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(object().shape({
    fullName: string().required().min(10).max(150),
    email: string().required().email(),
    cityId: number().integer().required().moreThan(0)
  }))
}));



export const create: RequestHandler<{}, {}, IBodyProps> = async (req, res) => {

  const result = await PersonsProvider.create(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: result.message
        }
      });
  }

  res.status(StatusCodes.CREATED).json(result);


};