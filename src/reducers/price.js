import {
  ADD_TOTAL_PRICE,
  CHANGE_TOTAL_PRICE,
} from '../actions';

const INITIAL_PRICE_STATE = {
  totalPrice: 0,
};

const aroundPriceChange = (value) => (Math.round((value) * 100) / 100);

function price(state = INITIAL_PRICE_STATE, action) {
  switch (action.type) {
  case ADD_TOTAL_PRICE: {
    const totalPrice = state.totalPrice + action.totalPrice;

    return {
      ...state,
      totalPrice: aroundPriceChange(totalPrice),
    };
  }
  case CHANGE_TOTAL_PRICE: {
    return {
      ...state,
      totalPrice: aroundPriceChange(action.totalPrice),
    };
  }
  default:
    return state;
  }
}

export default price;
