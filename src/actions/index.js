export const SAVE_EMAIL = 'SEVE_EMAIL';
export const SAVE_PASSWORD = 'SAVEPASSWORD';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const savePassword = (password) => ({
  type: SAVE_PASSWORD,
  password,
});
