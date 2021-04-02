import { SEND_CURRENCIES, ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const removeExpense = (currentExpenses, removedExpense) => {
  const newArrayOfExpenses = currentExpenses
    .filter((expense) => expense.id !== removedExpense.id);
  return newArrayOfExpenses;
};

const wallet = (
  state = INITIAL_STATE, { currencies, type, newExpense, removedExpense },
) => {
  switch (type) {
  case SEND_CURRENCIES:
    return { ...state, currencies };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, newExpense] };
  case REMOVE_EXPENSE:
    return { ...state, expenses: removeExpense(state.expenses, removedExpense) };
  default:
    return state;
  }
};

export default wallet;
