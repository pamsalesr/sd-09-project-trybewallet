// Coloque aqui suas actions
import getCurrencies from '../services/currenciesAPI';

export const LOGIN = 'LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES_SUCCESS = 'RECEIVE_CURRENCIES_SUCCESS';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';

export const loginAction = (userEmail) => ({
  type: LOGIN,
  email: userEmail,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrenciesSuccess = (currencies) => ({
  type: RECEIVE_CURRENCIES_SUCCESS,
  currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());

    const jsonData = await getCurrencies();
    dispatch(receiveCurrenciesSuccess(jsonData));
  };
}

export const addNewExpense = (newExpense, lastCurrencies) => ({
  type: ADD_NEW_EXPENSE,
  newExpense,
  lastCurrencies,
});

export function addExpense(newExpense) {
  return async (dispatch) => {
    dispatch(requestCurrencies());

    const lastCurrencies = await getCurrencies();
    dispatch(addNewExpense(newExpense, lastCurrencies));
  };
}
