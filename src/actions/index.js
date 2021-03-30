import cotationsApi from '../services/fetchCotation';
import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  LOGIN,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SEND_TO_EDIT,
  FINISH_EDIT,
} from './actionsTypes';

const startFetch = () => ({
  type: FETCH_START,
});

const successFetch = (data) => ({
  type: FETCH_SUCCESS,
  data,
});

const failFetch = (error) => ({
  type: FETCH_FAIL,
  error,
});

export function apiCurrencies() {
  return (dispatch) => {
    dispatch(startFetch());
    return cotationsApi()
      .then((data) => dispatch(successFetch(data)))
      .catch((error) => dispatch(failFetch(error)));
  };
}

export const loginEmail = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const sendToEdit = (expense) => ({
  type: SEND_TO_EDIT,
  expense,
});

export const finishEdit = (expense) => ({
  type: FINISH_EDIT,
  expense,
});
