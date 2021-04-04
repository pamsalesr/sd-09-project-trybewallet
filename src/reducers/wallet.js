// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SET_CURRENCIES, ADD_EXPENSES, SET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case SET_EXPENSES:
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
};

export default wallet;
