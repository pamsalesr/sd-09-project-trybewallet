import { ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { expenses: [
      ...state.expenses,
      {
        id: state.expenses.length,
        ...action.expense,
      },
    ] };
  case REMOVE_EXPENSE:
    return { expenses: state.expenses.filter(({ id }) => id !== action.expense.id) };
  default:
    return state;
  }
}
