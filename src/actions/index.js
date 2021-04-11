// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export function actionUser(email) {
  return {
    type: ADD_EMAIL,
    payload: email,
  };
}

export function actionExpense(expense) {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
}
