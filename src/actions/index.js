// Coloque aqui suas actions
import { SAVE_USER_DATA } from './actionTypes';

const saveUserData = (user) => ({
  type: SAVE_USER_DATA,
  email: user.email,
  password: user.password,
});

export default saveUserData;
