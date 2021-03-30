// Coloque aqui suas actions
import { LOGIN } from '../store/constantes';

const loginAct = (email) => ({
  type: LOGIN,
  payload: email,
});

export default loginAct;
