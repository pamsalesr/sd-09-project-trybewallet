import { ADD_EXPENSE, REQUEST_API } from './actionTypes';
import requestCurrency from '../services/requestCurrencyAPI';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const saveCurrencies = (currencies) => ({
  type: REQUEST_API,
  currencies,
});

export function getCurrencies() {
  return async (dispatch) => {
    const currencies = await requestCurrency();
    return dispatch(saveCurrencies(currencies));
  };
}
