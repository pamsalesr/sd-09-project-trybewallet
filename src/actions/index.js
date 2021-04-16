// import getAPI from '../services/currencyAPI';

export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const REM_EXPENSES = 'REM_EXPENSES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const addUser = (email) => ({ type: ADD_USER, email });
export const addExpenses = (data) => ({ type: ADD_EXPENSES, data });
export const editExpenses = (data) => ({ type: EDIT_EXPENSES, data });
export const isLoggedIn = () => ({ type: IS_LOGGED_IN, loggedIn: true });
export const remExpenses = (id) => ({ type: REM_EXPENSES, id });
export const requestCurrencies = () => ({ type: REQUEST_CURRENCIES });
export const receiveCurrencies = (data) => ({
  type: RECEIVE_CURRENCIES, data });

/* export function fetchThunk() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const dataAPI = await getAPI();
    dispatch(receiveCurrencies(dataAPI));
  };
} */
