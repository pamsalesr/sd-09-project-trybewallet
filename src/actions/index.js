// Coloque aqui suas actions
export const SAVES_USER_EMAIL = 'SAVES_USER_EMAIL';

export const savesUserEmail = (userEmail) => ({
  type: SAVES_USER_EMAIL,
  payload: userEmail,
});
