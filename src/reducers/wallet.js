const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const RETRIEVE_EXPENSE = 'RETRIEVE_EXPENSE';

function updateExpense(expenses, newExpense) {
  expenses.forEach((expense) => {
    if (expense.id === newExpense.id) {
      expense.value = newExpense.value;
    }
  });
  return expenses;
}

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.key) {
  case CREATE_EXPENSE:
    state = { ...state, ...state.wallet, expenses: action.expense };
    return state;
  case UPDATE_EXPENSE:
    state = {
      ...state, ...state.wallet, expenses: updateExpense(state.expenses, action.expense),
    };
    return state;
  case DELETE_EXPENSE:
    state = { ...state, ...state.wallet, expenses: state.wallet.expenses.pop(action.id) };
    return state;
  case RETRIEVE_EXPENSE:
    return state.wallet.expenses[action.id];
  default:
    return state;
  }
}
export default walletReducer;
