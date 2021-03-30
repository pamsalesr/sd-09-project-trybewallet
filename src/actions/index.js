import requestCurrencies from '../services/currenciesAPI';

export const LOGIN_USER = 'LOGIN_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const handleUserLogin = (email) => ({
  type: LOGIN_USER,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

const receiveCurrenciesList = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const getCurrenciesList = () => async (dispatch) => {
  const currenciesObj = await requestCurrencies();
  const currencies = Object.keys(currenciesObj).filter((currency) => currency !== 'USDT');
  return (dispatch(receiveCurrenciesList(currencies)));
};
