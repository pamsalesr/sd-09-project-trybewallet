// Coloque aqui suas actions
import { getCurrentPrice } from '../services/getCurrentPricesAPI';

export const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';

export const REQUEST_CURRENT_PRICE = 'REQUEST_CURRENT_PRICE';
export const RECEIVE_CURRENT_PRICE_SUCCESS = 'RECEIVE_CURRENT_PRICE_SUCCESS';
export const RECEIVE_CURRENT_PRICE_FAIL = 'RECEIVE_CURRENT_PRICE_FAIL';



export const saveUserEmail = (email) => ({
  type: SAVE_USER_EMAIL,
  email,
});

const requestCurrentPrice = () => ({
  type: REQUEST_CURRENT_PRICE,
});

const receiveCurrentPriceSuccess = (data) => ({
  type: RECEIVE_CURRENT_PRICE_SUCCESS,
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
