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

const saveCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export function getCurrency() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const object = await response.json();
      delete object.USDT;
      const currencyList = Object.keys(object);
      return dispatch(saveCurrencies(currencyList));
    } catch (error) {
      console.log(error);
    }
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
