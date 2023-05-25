import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';


export const ensureAuthenticated: RequestHandler = async (req, res, next) => {


  const { authorization } = req.headers;


  if (!authorization || !authorization.startsWith('Bearer')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        errors: {
          default: 'Unauthenticated!'
        }
      });
  }


  const [, token] = authorization.split(/\s/);


  const payload = JWTService.verify(token);


  if (payload === JWTService.EJWTError.SECRET_NOT_FOUND) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: 'Error trying to verify token!'
        }
      });
  }


  if ((payload === JWTService.EJWTError.INVALID_TOKEN)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        errors: {
          default: 'Unauthenticated!'
        }
      });
  }


  req.headers.userId = payload.uid.toString();


  return next();

};