// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSES } from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
};

export default wallet;
