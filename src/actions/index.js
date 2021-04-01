export const LOGIN = 'LOGIN';
export const EXPENSE = 'EXPENSE';
export const CURRENCY = 'CURRENCY';

export const loginAction = (loginInfo) => ({
  type: LOGIN,
  email: loginInfo,
});

export const expenseAction = (expense) => ({
  type: EXPENSE,
  expense,
});

export const currencyAction = (currencies) => ({
  type: CURRENCY,
  currencies,
});
