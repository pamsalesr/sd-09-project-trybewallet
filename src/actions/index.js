export const LOGIN = 'LOGIN';
// Coloque aqui suas actions

export const doLogin = (email) => ({
  type: LOGIN,
  email,
});
