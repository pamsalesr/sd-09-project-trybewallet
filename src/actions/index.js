import fetchCurrency from '../services/currencyApi';
import userLogin from './userAction';

export const SET_EMAIL = 'GET_EMAIL';
export const setEmail = (email) => (
  { type: SET_EMAIL, email }
);

export const SET_CURRENCIES = 'GET_CURRENCIES';
export const setCurrencies = (currencies) => (
  { type: SET_CURRENCIES, currencies }
);

export const ADD_EXPENSES = 'ADD_EXPENSES';
export const addExpenses = (expense) => (
  { type: ADD_EXPENSES, expense }
);

export const SET_EXPENSES = 'SET_EXPENSES';
export const setExpenses = (expenses) => (
  { type: SET_EXPENSES, expenses }
);

export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const editExpenses = (eventEdit, expense) => (
  { type: EDIT_EXPENSES, eventEdit, expense }
);

export const thunk = () => (
  async (dispatch) => {
    const result = await fetchCurrency();
    return dispatch(result);
  }
);

export default userLogin;
