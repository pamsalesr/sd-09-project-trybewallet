export const CHANGE_EMAIL_LOGIN = 'CHANGE_EMAIL_LOGIN';
export const UPDATE_EXCHANGE_RATES = 'UPDATE_EXCHANGE_RATES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const handleEmail = (emailLogin) => ({
  type: CHANGE_EMAIL_LOGIN,
  emailLogin,
});

export const handleExchangeRates = (exchangeRates) => ({
  type: UPDATE_EXCHANGE_RATES,
  exchangeRates,
});

export const handleAddExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const handleDelExpense = (id) => ({
  type: DEL_EXPENSE,
  id,
});

export const handleEditExpense = (dataState) => ({
  type: EDIT_EXPENSE,
  dataState,
});
