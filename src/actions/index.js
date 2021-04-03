// const INPUT_EMAIL = 'INPUT_EMAIL';

// const inputEmail = (email) => ({
//   type: INPUT_EMAIL,
//   email,
// });

// export default inputEmail;

export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const ADD_USER = 'ADD_USER';

export const isLoggedIn = () => ({
  type: IS_LOGGED_IN,
  loggedIn: true,
});

export const addUser = (email) => ({
  type: ADD_USER,
  user: email,
});
