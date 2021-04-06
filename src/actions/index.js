// Coloque aqui suas actions

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export function saveEmailAction(email) {
  return {
    type: SAVE_EMAIL,
    email,
  };
}

export function addExpenseAction(expense) {
  return {
    type: ADD_EXPENSE,
    expense,
  };
}

export function removeExpenseAction(expense) {
  return {
    type: REMOVE_EXPENSE,
    expense,
  };
}
