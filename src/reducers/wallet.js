// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENT_PRICE,
  RECEIVE_CURRENT_PRICE_SUCCESS,
  RECEIVE_CURRENT_PRICE_FAIL,
  SAVE_USER_EXPENSES_SELECT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

function wallet(state = INITIAL_STATE, action) {

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
      currencies: action.data,
    };
  case RECEIVE_CURRENT_PRICE_FAIL:
    return {
      isFetching: false,
      error: action.error,
    };
  case SAVE_USER_EXPENSES_SELECT:
    return {
      ...state,
      ...action,
    };
  default:
    return state;
  }
}

export default wallet;
