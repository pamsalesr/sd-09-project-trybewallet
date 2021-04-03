const INNITAL_STATE = {
  currencies: {},
  expenses: [],
};

const walletReducer = (state = INNITAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    state = {
      ...state,
      currencies: action.currencies,
    };
    return state;
  case 'ADD_EXPENSE':
    return { ...state,
      expenses: [...state.expenses, { ...action.expense, exchangeRates: action.data }] };
  case 'DELETE_EXPENSE':
    state.expenses.splice(action.id, 1);
    return { ...state,
      expenses: [...state.expenses],
    };
  case 'EDIT_EXPENSE':
    state.expenses.forEach((expense, index) => {
      if (expense.id === action.expense.id) {
        state.expenses[index] = {
          ...state.expenses[index],
          value: action.expense.value,
          currency: action.expense.currency,
          method: action.expense.method,
          tag: action.expense.tag,
          description: action.expense.description,
        };
      }
    });
    return {
      ...state,
      expenses: [...state.expenses],
    };
  default:
    return state;
  }
};

export default walletReducer;
