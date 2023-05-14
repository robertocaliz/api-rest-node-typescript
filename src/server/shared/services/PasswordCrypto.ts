import { compare, genSalt, hash } from 'bcryptjs';


const RANDOM_CHARACTERS_NUMBER = 8;


const getHash = async (password: string): Promise<string> => {
  const salt = await genSalt(RANDOM_CHARACTERS_NUMBER);
  return await hash(password, salt);
};



const equals = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash);
};


export const PasswordCrypto = {
  getHash,
  equals
};