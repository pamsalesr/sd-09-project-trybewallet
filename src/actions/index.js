export const LOGIN = 'LOGIN';
export const SEND_CURRENCIES = 'SEND_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const userLogin = (email) => ({
  type: LOGIN,
  email,
});

export const sendCurrencies = (currencies) => ({
  type: SEND_CURRENCIES,
  currencies,
});

export const addNewExpense = (newExpense) => ({
  type: ADD_EXPENSE,
  newExpense,
});
