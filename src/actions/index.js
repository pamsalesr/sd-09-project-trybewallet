// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const GET_CURRENCY_ACTION = 'GET_CURRENCY_ACTION';
export const SET_EXPENSES_ACTION = 'SET_EXPENSES_ACTION';
export const SET_TOTAL_EXPENSES = 'SET_TOTAL_EXPENSES';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const getCurrencyAction = (currencies) => ({
  type: GET_CURRENCY_ACTION,
  currencies,
});

export const setExpensesAction = (expenses) => ({
  type: SET_EXPENSES_ACTION,
  expenses,
});
