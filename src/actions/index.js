// Coloque aqui suas actions
const LOGIN = 'LOGIN';

const userAction = (userLogin) => ({
  type: LOGIN,
  userLogin,
});

export default userAction;
