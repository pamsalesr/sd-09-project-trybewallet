// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, REQUEST_VALUE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currencies: action.response,
    };
  case REQUEST_VALUE:
    return {
      ...state,
      data: action.data,
    };
  default:
    return state;
  }
};

export default wallet;
