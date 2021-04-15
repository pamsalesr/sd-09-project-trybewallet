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

// export function addCurrency(currencies) {
//   return {
//     type: Type.ADD_CURRENCY,
//     currencies,
//   };
// }

export function addExpense(expense) {
  return {
    type: Type.ADD_EXPENSE,
    expense,
  };
}

export function upgradeExpenses(expenses) {
  return {
    type: Type.UPGRADE_EXPENSES,
    expenses,
  };
}

export function addTotals(total, currency) {
  return {
    type: Type.ADD_TOTALS,
    total,
    currency,
  };
}

export function editExpense(idToEdit, editor) {
  return {
    type: Type.EDIT_EXPENSE,
    idToEdit,
    editor,
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
    return getCurrencyPrice()
      .then(
        (data) => dispatch(receiveCurrencySuccsess(data)),
      )
      .catch(
        (error) => dispatch(receiveCurrencyFailure(error)),
      );
  };
}
