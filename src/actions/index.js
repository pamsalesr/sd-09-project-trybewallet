import { LOGIN } from './actionTypes';

const makeLogin = (email) => ({
  type: LOGIN,
  email,
});

export default makeLogin;
