import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import { object, string } from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../database/models';
import { CityProvider } from '../../database/providers';



interface IBodyProps extends Omit<ICity, 'id'> { }


export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(object().shape({
    name: string().required().min(3).max(150),
  }))
}));



export const create = async (req: Request<{}, {}, ICity>, res: Response) => {

  const result = await CityProvider.create(req.body);

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

