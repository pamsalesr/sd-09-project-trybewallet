import * as Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: {},
  isFatching: false,
};

function currenciesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Type.REQUEST_CURRENCY:
    return {
      ...state,
      isFatching: true,
    };

  case Type.RECEIVE_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFatching: false,
    };

  case Type.RECEIVE_CURRENCY_FAILURE:
    return {
      ...state,
      error: action.error,
      isFatching: false,
    };

  case Type.ADD_CURRENCY:
    return {
      currencies: action.currency,
    };

  default:
    return state;
  }
}

export default currenciesReducer;
