// Coloque aqui suas actions

export const SAVE_LOGIN_INFO = 'SAVE_LOGIN_INFO';

export const saveLoginInfo = (data) => ({
  type: SAVE_LOGIN_INFO,
  inputEmail: data.email,
  inputPassword: data.password,
});
