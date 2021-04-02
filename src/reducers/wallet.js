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
  default:
    return state;
  }
};

export default walletReducer;
