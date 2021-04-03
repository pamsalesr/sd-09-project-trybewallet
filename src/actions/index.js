export const USER_LOGIN = 'USER_LOGIN';
// export const WALLET_LOGIN = 'LOGIN_EMAIL';

export const userLogin = (email, senha) => ({
  type: USER_LOGIN,
  user: { email, senha },
});

// export const loginEmail = (email) => ({
//   type: LOGIN_EMAIL,
//   email,
// });
