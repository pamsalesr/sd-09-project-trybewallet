// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export function actionUser(email) {
  return {
    type: ADD_EMAIL,
    payload: email,
  };
}
