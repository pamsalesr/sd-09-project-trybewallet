// Coloque aqui suas actions
export const ADD_EMAIL_STATE = 'ADD_EMAIL_STATE';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const ADD_TOTAL_PRICE = 'ADD_TOTAL_PRICE';
export const CHANGE_TOTAL_PRICE = 'CHANGE_TOTAL_PRICE';

export const ADD_EXPENSE_STATE = 'ADD_EXPENSE_STATE';
export const UPDATE_EXPENSE_STATE = 'UPDATE_EXPENSE_STATE';
export const DELETE_EXPENSE_STATE = 'DELETE_EXPENSE_STATE';

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

// USER
export const addEmailState = (email) => ({
  type: ADD_EMAIL_STATE,
  email,
});

// CURRENCIES
export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
  isFetching: true,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const failedRequest = () => ({
  type: FAILED_REQUEST,
});

export const fetchCurrencies = () => (
  async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const endpoint = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(endpoint);
      const data = await response.json();

      delete data.USDT;
      return dispatch(receiveCurrencies(data));
    } catch (error) {
      return dispatch(failedRequest());
    }
  }
);

// TOTAL PRICE
export const addTotalPriceState = (totalPrice) => ({
  type: ADD_TOTAL_PRICE,
  totalPrice,
});

export const changeTotalPriceState = (totalPrice) => ({
  type: CHANGE_TOTAL_PRICE,
  totalPrice,
});

// EXPENSES
export const addExpenseState = (expenses) => ({
  type: ADD_EXPENSE_STATE,
  expenses,
});

export const updateExpenseState = (expenses) => ({
  type: UPDATE_EXPENSE_STATE,
  expenses,
});

export const deleteExpenseState = (expenses) => ({
  type: DELETE_EXPENSE_STATE,
  expenses,
});

export const editExpense = (editor, idToEdit) => ({
  type: EDIT_EXPENSE,
  editor,
  idToEdit,
});
