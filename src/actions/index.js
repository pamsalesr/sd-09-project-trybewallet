// Coloque aqui suas actions
import md5 from 'crypto-js/md5';

export const SAVE_LOGIN_INFO = 'SAVE_LOGIN_INFO';

export const saveLoginInfo = (data) => ({
  type: SAVE_LOGIN_INFO,
  inputEmail: data.email,
  inputPassword: md5(data.password).toString(),
});
