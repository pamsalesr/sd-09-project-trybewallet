// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE,
  { type, expense, currency, exchangeRates, total }) => {
  switch (type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, { ...expense, exchangeRates }],
    };
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
      currencies: [...state.currencies, ...currency],
    };
  case 'TOTAL_EXPENSES':
    return {
      ...state,
      total: state.total + total,
    };
  default:
    return state;
  }
};

export default wallet;
