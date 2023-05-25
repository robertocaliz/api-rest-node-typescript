
import * as Jwt from 'jsonwebtoken';


interface IUserData {
  uid: number;
}


enum EJWTError {
  SECRET_NOT_FOUND = 1,
  INVALID_TOKEN = 2
}


const jwtSecret = process.env.JWT_SECRET;



const sign = (data: IUserData): EJWTError | string => {
  if (!jwtSecret) return EJWTError.SECRET_NOT_FOUND;
  return Jwt.sign(data, jwtSecret, { expiresIn: '1h' });
};


const verify = (token: string): EJWTError | Jwt.JwtPayload => {
  if (!jwtSecret) return EJWTError.SECRET_NOT_FOUND;
  try {
    const payload = Jwt.verify(token, jwtSecret);
    if (typeof payload === 'string') {
      return EJWTError.INVALID_TOKEN;
    }
    return payload as IUserData;
  } catch (error) {
    console.log(error);
    return EJWTError.INVALID_TOKEN;
  }
};


export const JWTService = {
  sign,
  verify,
  EJWTError
};