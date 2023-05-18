
import * as Jwt from 'jsonwebtoken';



interface IUserData {
  uid: number;
}


enum EJWTErrorMessages {
  SECRET_NOT_FOUND = 'JWT_SECRET_NOT_FOUND',
  INVALID_TOKEN = 'INVALID_TOKEN'
}


const jwtSecret = process.env.JWT_SECRET;


const sign = (data: IUserData) => {
  if (!jwtSecret) return EJWTErrorMessages.SECRET_NOT_FOUND;
  return Jwt.sign(data, jwtSecret, { expiresIn: '1h' });
};


const verify = (token: string) => {
  if (!jwtSecret) return EJWTErrorMessages.SECRET_NOT_FOUND;
  try {
    const payload = Jwt.verify(token, jwtSecret);
    if (typeof payload === 'string') {
      return EJWTErrorMessages.INVALID_TOKEN;
    }
    return payload as IUserData;
  } catch (error) {
    console.log(error);
    return EJWTErrorMessages.INVALID_TOKEN;
  }
};


export const JWTService = {
  sign,
  verify,
  EJWTErrorMessages
};