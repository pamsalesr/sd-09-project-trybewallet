import fetchApi from '../services/api';

// Coloque aqui suas actions
const updateUserEmail = (store) => ({ type: 'EMAIL_REGISTERED', email: store });

const GET_CURRENCY = 'GET_CURRENCY';

const ADD_EXPENSE = 'ADD_EXPENSE';

const DELETE_EXPENSE = 'DELETE_EXPENSE';

function getCurrency(json) {
  return { type: GET_CURRENCY, payload: json };
}

export function addExpense(expense) {
  return { type: ADD_EXPENSE, payload: expense };
}

export function fetchCurrency() {
  return async (dispatch) => dispatch(getCurrency(await fetchApi()));
}

export function deleteExpense(expense) {
  return { type: DELETE_EXPENSE, payload: expense };
}

export default updateUserEmail;
