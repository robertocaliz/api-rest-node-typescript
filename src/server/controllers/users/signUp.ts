import { RequestHandler } from 'express';
import { IUser } from '../../database/models';
import { UsersProvider } from '../../database/providers/users';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { object, string } from 'yup';



interface IBodyProps extends Omit<IUser, 'id'> { }


export const signUpValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(object().shape({
    name: string().required().min(3),
    email: string().required().email().min(7),
    password: string().required().min(8)
  }))
}));


export const signUp: RequestHandler<{}, {}, IBodyProps> = async (req, res) => {

  const id = await UsersProvider.create(req.body);

  if (id instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: id.message
        }
      });
  }

  res.status(StatusCodes.CREATED).json(id);

};