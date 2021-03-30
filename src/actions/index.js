import {
  ADD_USER,
  ADD_EXPANSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_EXPENSE_FOR_ID,
  ADD_CURRENCY,
} from './actionTypes';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

const requestCurrencysSuccess = (currencys) => {
  const currencysFilter = currencys.filter((value) => value !== 'USDT');
  return {
    type: ADD_CURRENCY,
    currencys: currencysFilter,
  };
};

export const addCurrencys = () => async (dispatch) => {
  const resp = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await resp.json();
  return dispatch(requestCurrencysSuccess(Object.keys(result)));
};

export const requestCurrency = () => ({
  type: 'REQUEST',
  idFetching: true,
});

export const newExpanseAndCurrency = (expense, exchangeRates) => {
  const {
    value,
    description,
    tag,
    currency,
    payment,
  } = expense;
  return {
    type: ADD_EXPANSE,
    value,
    description,
    tag,
    currency,
    payment,
    exchangeRates,
    // totalExpense: parseFloat(value) * parseFloat(coin.ask),
  };
};

export const deleteExpense = (index) => ({
  type: DELETE_EXPENSE,
  index,
});

export const editExpense = (editID) => ({
  type: EDIT_EXPENSE,
  editActivated: true,
  editID,
});

export const editExpenseForID = (expense, editID) => ({
  type: EDIT_EXPENSE_FOR_ID,
  editActivated: false,
  expense,
  editID,
});

export const expenseThunk = (expense) => (dispatch) => {
  dispatch(requestCurrency());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((resp) => resp.json())
    .then((obj) => dispatch(newExpanseAndCurrency(expense, obj)));
};
