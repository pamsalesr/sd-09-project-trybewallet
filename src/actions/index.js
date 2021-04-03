export const LOGGED_IN = 'LOGGED_IN';

export const loggedInAction = (email) => ({
  type: LOGGED_IN,
  email,
});
