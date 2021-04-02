import { SEND_CURRENCIES, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (
  state = INITIAL_STATE, { currencies, type, newExpense },
) => {
  switch (type) {
  case SEND_CURRENCIES:
    return { ...state, currencies };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, newExpense] };
  default:
    return state;
  }
};

export default wallet;
