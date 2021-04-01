// Coloque aqui suas actions
import { REQUEST_LOGIN } from './actionTypes';

const requestLogin = () => ({
  type: REQUEST_LOGIN,
  user: '',
  password: '',
  authorizedLogin: false,
});
