import requestCurrency from '../services/awesomeApi';

export const LOGIN_INFORMATION = 'LOGIN_INFORMATION';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const TOTAL_PRICE = 'TOTAL_PRICE';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const HANDLE_DELETE = 'HANDLE_DELETE';
export const HANDLE_NEW_TOTAL = 'HANDLE_NEW_TOTAL';

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

export const handleTotalPrice = (value) => ({
  type: 'TOTAL_PRICE',
  value,
});

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

export const handleDelete = (expense) => ({
  type: HANDLE_DELETE,
  expense,
});

export const handleNewTotal = (newTotal) => ({
  type: HANDLE_NEW_TOTAL,
  newTotal,
});
