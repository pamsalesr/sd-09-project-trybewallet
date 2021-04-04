const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CURRENCIES':
    return { ...state, currencies: action.currencies };
  case 'EXPENSES':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'TOTAL':
    return {
      total: state.total + action.somaTotal,
    };
  default:
    return state;
  }
}

export default walletReducer;
