// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES } from '../actions/index';

const INITIAL_EXPENSES_STATE = {
  expenses: [],
};

const expenses = (state = INITIAL_EXPENSES_STATE, { type, currExpenses }) => {
  switch (type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: currExpenses,
    };
  default:
    return state;
  }
};

export default expenses;
