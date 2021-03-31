// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_VALUES, CREATE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_VALUES:
    return { ...state, currencies: [...state.currencies, ...action.currencies] };

  case CREATE_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };

  default:
    return state;
  }
};

export default wallet;
