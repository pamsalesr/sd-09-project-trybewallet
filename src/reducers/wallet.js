// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_VALUES, EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_VALUES:
    return {
      ...state,
      currencies: [...state.currencies, ...action.currencies],
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
};

export default wallet;
