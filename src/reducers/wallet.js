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
  case 'CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'EDIT':
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.expense.id),
        action.expense,
      ].sort((a, b) => a.id - b.id),
    };
  case 'RATES':
    return {
      ...state,
      rates: action.rates,
    };
  default:
    return state;
  }
};

export default walletReducer;
