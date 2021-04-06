import { ADD_EXPENSE, REQUEST_API, DELETE_EXPENSE, UPDATE_TOTAL } from './actionTypes';
import requestCurrency from '../services/requestCurrencyAPI';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const saveCurrencies = (currencies) => ({
  type: REQUEST_API,
  currencies,
});

export const deleteExpense = (newExpenses) => ({
  type: DELETE_EXPENSE,
  newExpenses,
});

export const updateTotal = (value) => ({
  type: UPDATE_TOTAL,
  value,
});

export function getCurrencies() {
  return async (dispatch) => {
    const currencies = await requestCurrency();
    return dispatch(saveCurrencies(currencies));
  };
}
