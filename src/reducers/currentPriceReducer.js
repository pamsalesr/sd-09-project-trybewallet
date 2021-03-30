// import { currentPrice } from '../actions/index';
import {
  REQUEST_CURRENT_PRICE,
  RECEIVE_CURRENT_PRICE_SUCCESS,
  RECEIVE_CURRENT_PRICE_FAIL,
} from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  error: '',
};

const currentPriceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENT_PRICE:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENT_PRICE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      data: action.data,
    };
  case RECEIVE_CURRENT_PRICE_FAIL:
    return {
      isFetching: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default currentPriceReducer;
