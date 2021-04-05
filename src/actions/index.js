export const SIGNIN = '@TRYBEWALLET/LOGIN';

export const signin = (email) => ({
  type: SIGNIN,
  payload: email,
});
