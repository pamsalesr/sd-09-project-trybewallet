import fetchAllCurrencyData from '../services/cambio';

export const LOGIN = 'LOGIN';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const TOTAL_VALUE = 'TOTAL_VALUE';

export const userEmail = (email) => ({
  type: LOGIN,
  email,
});

const receiveCurrencies = (currenciesList) => ({
  type: FETCH_CURRENCIES,
  currenciesList,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const currenciesList = await fetchAllCurrencyData();
    return dispatch(receiveCurrencies(currenciesList));
  };
}

export const addNewExpenses = (newExpense) => ({
  type: ADD_EXPENSE,
  newExpense,
});
