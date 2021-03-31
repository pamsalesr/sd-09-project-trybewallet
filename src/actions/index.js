import requestCurrencies from '../services/currenciesAPI';

export const LOGIN_USER = 'LOGIN_USER';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const RESET_FORM = 'RESET_FORM';
export const RECEIVE_EXPENSE_EDITIONS = 'RECEIVE_EXPENSE_EDITION';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const handleUserLogin = (email) => ({
  type: LOGIN_USER,
  email,
});

const receiveCurrenciesList = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

const receiveExpenseAddition = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const handleExpenseDeletion = (newArrExpenses) => ({
  type: DELETE_EXPENSE,
  expenses: newArrExpenses,
});

const resetForm = () => ({ type: RESET_FORM });

export const handleExpenseEdition = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const getCurrenciesList = () => async (dispatch) => {
  const currenciesObj = await requestCurrencies();
  const currencies = Object.keys(currenciesObj).filter((currency) => currency !== 'USDT');
  return (dispatch(receiveCurrenciesList(currencies)));
};

export const addExpense = (expense) => async (dispatch) => {
  const exchangeRates = await requestCurrencies();
  dispatch(resetForm());
  return (dispatch(receiveExpenseAddition({ ...expense, exchangeRates })));
};

export const receiveExpenseEdition = (expense) => (dispatch) => {
  dispatch(resetForm());
  console.log('action');
  return (dispatch({ type: RECEIVE_EXPENSE_EDITIONS, expense }));
};
