// Coloque aqui suas actions

export const SAVE_EMAIL = 'SAVE_EMAIL';

export function saveEmailAction(email) {
  return {
    type: SAVE_EMAIL,
    email,
  };
}
