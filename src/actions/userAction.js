import { LOGIN } from './actionTypes';

const userAction = (email) => ({
  type: LOGIN,
  email,
});

export default userAction;
