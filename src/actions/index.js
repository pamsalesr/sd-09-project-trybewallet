import apiCurrencies from '../services/APIcurrencies';
import {
  SAVE_EMAIL,
  SAVE_PASSWORD,
  CURRENCIES,
  SAVE_EXPENSES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDIT_EXPENSE,
  REQUEST_CURRENCIES_SUCCESS,
} from './actionsType';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const savePassword = (password) => ({
  type: SAVE_PASSWORD,
  password,
});

export const saveCurrencies = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});

export const deletExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const endEdit = (expense) => ({
  type: SAVE_EDIT_EXPENSE,
  expense,
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  currencies,
  isFetching: false,
});

export const fetchCurrencies = () => (dispatch) => {
  apiCurrencies()
    .then((currenciesResponse) => dispatch(
      requestCurrenciesSuccess(Object.keys(currenciesResponse)),
    ));
};
