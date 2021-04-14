const INITIAL_STATE = {
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EXPENSE':
    return {
      ...state,
      expenses: state.expenses.concat(action.expense),
    };
  case 'DELETE':
    return {
      ...state,
      expenses: [...action.newExpenses],
    };
  default:
    return state;
  }
};

export default walletReducer;
