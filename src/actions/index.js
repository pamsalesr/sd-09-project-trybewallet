// Coloque aqui suas actions
import { LOGIN } from './actionsTypes';

const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export default loginAction;
