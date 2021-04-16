import { LOGIN } from './actionsTypes';

const userLogin = (email) => ({
  type: LOGIN,
  email,
});

export default userLogin;
