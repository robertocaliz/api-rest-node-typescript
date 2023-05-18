import { RequestHandler } from 'express';
import { validation } from '../../shared/middleware';
import { object, string } from 'yup';
import { UsersProvider } from '../../database/providers';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models';
import { JWTService, PasswordCrypto } from '../../shared/services';



interface IBodyProps extends Omit<IUser, 'id' | 'name'> { }



export const signInValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(object().shape({
    email: string().email().required().min(7),
    password: string().required().min(8)
  }))
}));


export const signIn: RequestHandler<{}, {}, IBodyProps> = async (req, res) => {

  const { email, password } = req.body;


  const user = await UsersProvider.getByEmail(email);


  if (user instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: user.message
        }
      });
  }


  if (!(user) || !(await PasswordCrypto.equals(password, user.password))) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        errors: {
          default: 'Invalid e-mail or password!'
        }
      });
  }


  const accessToken = JWTService.sign({ uid: user.id });
  if (accessToken === JWTService.EJWTErrorMessages.SECRET_NOT_FOUND) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: 'Error trying to generate access token'
        }
      });
  }

  res.status(StatusCodes.OK).json(accessToken);

};