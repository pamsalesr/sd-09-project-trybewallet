import { ADD_USER } from './types';

const newUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export default newUser;
