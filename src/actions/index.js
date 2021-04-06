export const HANDLE_EMAIL = 'HANDLE_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const FETCHING_CURRENCIES = 'FETCHING_CURRENCIES';
export const SET_NEW_EXPENSE = 'SET_NEW_EXPENSE';
export const GET_TOTAL_VALUE = 'GET_TOTAL_VALUE';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const UPDATE_TOTAL_VALUE = 'UPDATE_TOTAL_VALUE';
export const SET_EDITABLE_EXPENSE = 'SET_EDITABLE_EXPENSE';
export const SET_EDITABLE_OFF = 'SET_EDITABLE_OFF';

export const handleEmail = (email) => ({
  type: HANDLE_EMAIL,
  email,
});

export const setCurrencies = (currenciesObject) => ({
  type: SET_CURRENCIES,
  currenciesObject,
});

export const fetchingCurrencies = () => ({
  type: FETCHING_CURRENCIES,
});

export const setNewExpense = ({ ...args }) => ({
  type: SET_NEW_EXPENSE,
  expense: args,
});

export const getTotalValue = (expenseValue) => ({
  type: GET_TOTAL_VALUE,
  expenseValue,
});

export const updateExpenses = (updatedExpenses) => ({
  type: UPDATE_EXPENSES,
  updatedExpenses,
});

export const updateTotalValue = (expenses) => ({
  type: UPDATE_TOTAL_VALUE,
  expenses,
});

export const setEditableExpense = (object) => ({
  type: SET_EDITABLE_EXPENSE,
  object,
});

export const setEditableOff = () => ({
  type: SET_EDITABLE_OFF,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(fetchingCurrencies());
    try {
      const endPoint = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(endPoint);
      const object = await response.json();
      Reflect.deleteProperty(object, 'USDT');
      const currenciesNamesArray = Object.keys(object);
      return dispatch(setCurrencies(currenciesNamesArray));
    } catch (error) {
      console.log(error);
    }
  };
}
