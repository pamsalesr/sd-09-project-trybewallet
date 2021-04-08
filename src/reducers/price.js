import {
  ADD_TOTAL_PRICE,
  REMOVE_TOTAL_PRICE,
} from '../actions';
import { convertValue } from '../services';

const INITIAL_PRICE_STATE = {
  totalPrice: 0,
};

function price(state = INITIAL_PRICE_STATE, action) {
  switch (action.type) {
  case ADD_TOTAL_PRICE: {
    const totalPrice = state.totalPrice + action.totalPrice;

    return {
      ...state,
      totalPrice: convertValue(totalPrice),
    };
  }
  case REMOVE_TOTAL_PRICE:
    return {
      ...state,
      totalPrice: convertValue(action.totalPrice),
    };
  default:
    return state;
  }
}

export default price;
