import requestCurrency from '../services/awesomeApi';

export const LOGIN_INFORMATION = 'LOGIN_INFORMATION';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const TOTAL_PRICE = 'TOTAL_PRICE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export function saveLoginInformation(email) {
  return {
    type: 'LOGIN_INFORMATION',
    email,
  };
}

export const addExpenses = (expensesObj) => ({
  type: 'ADD_EXPENSES',
  expensesObj,
});

export const handleTotalPrice = (totalPrice) => ({
  type: 'TOTAL_PRICE',
  totalPrice,
});

// const addExpenses = (expense) => ({
//   type: ADD_EXPENSES,
//   expense,
// });

const saveCurrencies = (currencyList) => ({
  type: GET_CURRENCIES,
  currencyList,
});

export function getCurrency() {
  return async (dispatch) => {
    const currencyList = await requestCurrency();
    return dispatch(saveCurrencies(currencyList));
  };
}
