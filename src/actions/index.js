import requestCurrencies from '../services/currenciesAPI';

export const LOGIN_USER = 'LOGIN_USER';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
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

export const handleDeleteExpense = (newArrExpenses) => ({
  type: DELETE_EXPENSE,
  expenses: newArrExpenses,
});

export const getCurrenciesList = () => async (dispatch) => {
  const currenciesObj = await requestCurrencies();
  const currencies = Object.keys(currenciesObj).filter((currency) => currency !== 'USDT');
  return (dispatch(receiveCurrenciesList(currencies)));
};

export const addExpense = (expense) => async (dispatch) => {
  const exchangeRates = await requestCurrencies();
  return (dispatch(receiveExpenseAddition({ ...expense, exchangeRates })));
};
