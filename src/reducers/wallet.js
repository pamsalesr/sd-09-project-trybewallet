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
  default:
    return state;
  }
};

export default walletReducer;
