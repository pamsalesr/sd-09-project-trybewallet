import {
  ADD_EXPENSE,
  ADD_USER,
  ERROR_CURRENCY,
  GET_CURRENCY,
  REQUEST_CURRENCY,
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

const requestCurrencies = () => ({
  type: REQUEST_CURRENCY,
  payload: {
    isFetching: true,
  },
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
