import * as Type from './actionsTypes';
import { getCurrencyPrice } from '../services/currencyApi';

export function addUser(email, password, button, shouldRedirect) {
  return {
    type: Type.ADD_USER,
    email,
    password,
    button,
    shouldRedirect,
  };
}

export function addCurrency(currencies) {
  return {
    type: Type.ADD_CURRENCY,
    currencies,
  };
}

export function addExpense(expense) {
  return {
    type: Type.ADD_EXPENSE,
    id: expense.id,
    value: expense.value,
    description: expense.description,
    currency: expense.currency,
    method: expense.method,
    tag: expense.tag,
    exchangeRates: expense.exchangeRates,
  };
}

export function addTotals(total, currency) {
  return {
    type: Type.ADD_TOTALS,
    total,
    currency,
  };
}

const requestCurrency = () => ({
  type: Type.REQUEST_CURRENCY,
});

const receiveCurrencySuccsess = (data) => ({
  type: Type.RECEIVE_CURRENCY_SUCCESS,
  currencies: data,
});

const receiveCurrencyFailure = (error) => ({
  type: Type.RECEIVE_CURRENCY_FAILURE,
  error,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());
    getCurrencyPrice().then((teste) => { console.log(teste) });
    return getCurrencyPrice()
      .then(
        (data) => dispatch(receiveCurrencySuccsess(data)),
      )
      .catch(
        (error) => dispatch(receiveCurrencyFailure(error)),
      );
  };
}
