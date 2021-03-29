// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const saveLogin = (email) => ({
  type: LOGIN,
  email,
});
