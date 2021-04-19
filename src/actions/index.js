export const LOGIN_INFORMATION = 'LOGIN_INFORMATION';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const TOTAL_PRICE = 'TOTAL_PRICE';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const HANDLE_DELETE = 'HANDLE_DELETE';
export const EDIT_EXPENSE_ON = 'EDIT_EXPENSE_ON';
export const EDIT_EXPENSE_OFF = 'EDIT_EXPENSE_OFF';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

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

export const editExpenseOn = (editObject) => ({
  type: EDIT_EXPENSE_ON,
  editObject,
});

export const editExpenseOff = () => ({
  type: EDIT_EXPENSE_OFF,
});

export const updateExpenses = (updatedExpenses) => ({
  type: UPDATE_EXPENSES,
  updatedExpenses,
});
