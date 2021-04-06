import {
  HANDLE_CURRENCIES,
  HANDLE_INPUTS,
  HANDLE_TOTAL,
  HANDLE_DELETE,
  HANDLE_NEW_TOTAL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };

  case HANDLE_INPUTS:
    return {
      ...state,
      expenses: [...state.expenses, action.obj],
    };

  case HANDLE_TOTAL:
    return {
      ...state,
      total: state.total + action.value,
    };

  case HANDLE_DELETE:
    return {
      ...state,
      expenses: action.expense,
    };

  case HANDLE_NEW_TOTAL:
    return {
      ...state,
      total: action.newTotal,
    };

  default:
    return state;
  }
};

export default wallet;
