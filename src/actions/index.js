import {
  ADD_EXPENSE,
  ADD_USER,
  DELETE_EXPENSE,
  ERROR_CURRENCY,
  GET_CURRENCY,
  GET_HELPER,
  REQUEST_CURRENCY,
  UPDATE_EXPENSE,
} from './types';
import getCurrencies from '../services/api';

export const newUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const editExpense = (expense) => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCY,
  payload: {
    isFetching: true,
  },
});

export const getHelper = (editMethod) => ({
  type: GET_HELPER,
  payload: editMethod,
});

const responseCurrencies = (response) => ({
  type: GET_CURRENCY,
  payload: response,
});

const errorCurrencies = (error) => ({
  type: ERROR_CURRENCY,
  payload: {
    error,
  },
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  payload: expense,
});

export const fetchExpense = (expense) => (dispatch) => getCurrencies().then(
  (response) => dispatch(addExpense({ response, expense })),
  (error) => { console.error(error); },
);

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrencies());
  return getCurrencies().then(
    (response) => dispatch(responseCurrencies(response)),
    (error) => dispatch(errorCurrencies(error)),
  );
};
