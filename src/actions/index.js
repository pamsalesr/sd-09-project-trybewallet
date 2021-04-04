export const USER_LOGIN = 'USER_LOGIN';
// export const WALLET_LOGIN = 'LOGIN_EMAIL';

export const saveEmail = (email) => ({
  type: USER_LOGIN,
  email,
});

// export const loginEmail = (email) => ({
//   type: LOGIN_EMAIL,
//   email,
// });
