// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const loginAction = (userEmail) => ({
  type: LOGIN,
  email: userEmail,
});
