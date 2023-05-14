import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import { object, string, number } from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../database/models';
import { CitiesProvider } from '../../database/providers';


interface IBodyProps extends Omit<ICity, 'id'> { }


interface IParamsProps {
  id?: number;
}


export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(object().shape({
    id: number().integer().required().moreThan(0)
  })),
  body: getSchema<IBodyProps>(object().shape({
    name: string().required().min(3).max(150),
  }))
}));


export const updateById = async (req: Request<IParamsProps>, res: Response) => {
  const { id } = req.params;
  const result = await CitiesProvider.updateById(req.body, Number(id));
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