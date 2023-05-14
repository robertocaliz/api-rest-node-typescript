import { RequestHandler } from 'express';
import { validation } from '../../shared/middleware';
import { object, number } from 'yup';
import { StatusCodes } from 'http-status-codes';
import { CitiesProvider } from '../../database/providers';



interface IParamsProps {
  id?: number;
}


export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(object().shape({
    id: number().integer().required().moreThan(0)
  }))
}));


export const deleteById: RequestHandler<IParamsProps> = async (req, res) => {
  const { id = 0 } = req.params;
  const result = await CitiesProvider.deleteById(id);
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