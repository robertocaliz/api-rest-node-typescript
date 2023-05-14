import { RequestHandler } from 'express';
import { IPerson } from '../../database/models';
import { PersonsProvider } from '../../database/providers';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { number, object, string } from 'yup';


interface IParamsProps {
  id?: number
}


interface IBodyProps extends Omit<IPerson, 'id'> { }


export const updateByIdValidation = validation(getSchema => ({
  params: getSchema<IParamsProps>(object().shape({
    id: number().integer().required().moreThan(0)
  })),
  body: getSchema<IBodyProps>(object().shape({
    fullName: string().required().min(10).max(150),
    email: string().required().email(),
    cityId: number().integer().required().moreThan(0)
  }))
}));


export const updateById: RequestHandler<IParamsProps, {}, IBodyProps> = async (req, res) => {

  const { id = 0 } = req.params;

  const result = await PersonsProvider.updateById(req.body, id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: result.message
        }
      });
  }

  res.status(StatusCodes.NO_CONTENT).send();

};