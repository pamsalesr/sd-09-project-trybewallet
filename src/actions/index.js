import {
  LOGIN,
  ADD_COST,
  DELETE_COST,
  REQUEST_COIN,
  RECEIVE_COIN,
  ERROR_FETCH,
  EDIT_COST,
} from './ActionsDescribe';
import fetchToCoinApi from '../helpers/fetchApi';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const requestCoins = () => ({
  type: REQUEST_COIN,
});

export const receiveCoins = (coins) => ({
  type: RECEIVE_COIN,
  coins,
});

export const fetchError = (error) => ({
  type: ERROR_FETCH,
  error,
});

export const deletCost = (cost) => ({
  type: DELETE_COST,
  cost,
});

export const addCost = (cost) => ({
  type: ADD_COST,
  cost,
});

export const editCost = (cost) => ({
  type: EDIT_COST,
  cost,
});

export function currenciesFetch() {
  return (dispatch) => {
    dispatch(requestCoins());
    return fetchToCoinApi()
      .then((data) => dispatch(receiveCoins(data)))
      .catch((error) => dispatch(fetchError(error)));
  };
}
