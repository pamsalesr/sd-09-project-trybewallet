// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE,
  { type, expense, currency, exchangeRates, total, expenses }) => {
  switch (type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, { ...expense, exchangeRates }],
    };
  case 'DEL_EXPENSE':
    return {
      ...state,
      expenses,
    };
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
      currencies: [...state.currencies, ...currency],
    };
  case 'TOTAL_EXPENSES':
    return {
      ...state,
      total,
    };
  default:
    return state;
  }
};

export default wallet;
