export const LOGIN = 'LOGIN';

export const doLogin = ({ email, password }) => ({
  type: LOGIN,
  email,
  password,
});
