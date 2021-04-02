// Coloque aqui suas actions
import { getCurrentPrice } from '../services/getCurrentPricesAPI';

export const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
export const SAVE_USER_EXPENSE = 'SAVE_USER_EXPENSES_SELECT';
export const ADD_SAVE_USER_EXPENSE = 'ADD_SAVE_USER_EXPENSE';
export const DELETE_USER_EXPENSE = 'DELETE_USER_EXPENSE';

export const REQUEST_CURRENT_PRICE = 'REQUEST_CURRENT_PRICE';
export const RECEIVE_CURRENT_PRICE_SUCCESS = 'RECEIVE_CURRENT_PRICE_SUCCESS';
export const RECEIVE_CURRENT_PRICE_FAIL = 'RECEIVE_CURRENT_PRICE_FAIL';

const requestCurrentPrice = () => ({
  type: REQUEST_CURRENT_PRICE,
});

const receiveCurrentPriceSuccess = (data) => ({
  type: RECEIVE_CURRENT_PRICE_SUCCESS,
  data,
});

const receiveCurrentPriceFail = (error) => ({
  type: RECEIVE_CURRENT_PRICE_FAIL,
  error,
});

export function currentPrice() {
  return (dispatch) => {
    dispatch(requestCurrentPrice());
    return getCurrentPrice()
      .then((data) => dispatch(receiveCurrentPriceSuccess(data)))
      .catch((error) => dispatch(receiveCurrentPriceFail(error)));
  };
}

export const saveUserEmail = (email) => ({
  type: SAVE_USER_EMAIL,
  email,
});

export const saveUserExpense = (state) => ({
  type: SAVE_USER_EXPENSE,
  expenseDetails: state,
});

export const addSaveUserExpense = (chooseCoinAndCoins) => ({
  type: ADD_SAVE_USER_EXPENSE,
  ask: chooseCoinAndCoins[0],
  coins: chooseCoinAndCoins[1],
});

export const deleteUserExpense = (id) => ({
  type: DELETE_USER_EXPENSE,
  id,
});
