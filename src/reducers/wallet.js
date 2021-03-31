// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST,
  REQUEST_SECCESS,
  REQUEST_ERROR,
  EXPENSES_DATA,
} from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

const requestApireducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      loading: action.loading,
    };
  case REQUEST_SECCESS:
    return {
      ...state,
      loading: action.loading,
      currencies: action.data,
    };
  case REQUEST_ERROR:
    return {
      ...state,
      loading: action.loading,
      error: action.error,
    };
  case EXPENSES_DATA:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.object],
    };
  default:
    return state;
  }
};

export default requestApireducer;
