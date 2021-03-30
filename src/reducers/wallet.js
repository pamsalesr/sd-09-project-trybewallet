const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.types) {
  case 'WALLET':
    return { currencies: action.currencies,
      expenses: action.expenses,
    };
  case 'TOTAL':
    return {
      total: state.total + action.somaTotal,
    };
  default:
    return state;
  }
}

export default walletReducer;
