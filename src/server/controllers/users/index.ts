import * as signUp from './signUp';
import * as signIn from './SignIn';



export const UsersController = {
  ...signUp,
  ...signIn
};