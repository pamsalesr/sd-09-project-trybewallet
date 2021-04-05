// Coloque aqui suas actions
import getEconomicData from '../services/economicAPI';

export const RECEIVE_ECONOMIC_DATA = 'RECEIVE_ECONOMIC_DATA';
export const REQUEST_ECONOMIC_DATA = 'REQUEST_ECONOMIC_DATA';
export const REQUEST_ECONOMIC_DATA_SUCCESS = 'REQUEST_ECONOMIC_DATA_SUCCESS';
export const EMAIL_INPUT = 'EMAIL_INPUT';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

export const receiveEconomicAction = (data) => ({
  type: RECEIVE_ECONOMIC_DATA,
  data,
});

export const requestEconomicDataAction = () => ({
  type: REQUEST_ECONOMIC_DATA,
});

export const receiveEconomicSuccessAction = (data) => ({
  type: REQUEST_ECONOMIC_DATA_SUCCESS,
  data,
});

export function fetchEconomicDataAction() {
  return async (dispatch) => {
    dispatch(requestEconomicDataAction());

    const jsonData = await getEconomicData();
    dispatch(receiveEconomicSuccessAction(jsonData));
  };
}

export const emailAction = (email) => ({
  type: EMAIL_INPUT,
  email,
});

export const addExpensesActions = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const RemoveExpensesActions = (id) => ({
  type: REMOVE_EXPENSES,
  id,
});
