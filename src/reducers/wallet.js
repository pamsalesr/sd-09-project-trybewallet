// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE,
  { type, expense, currency, exchangeRates, total, id }) => {
  switch (type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, { ...expense, exchangeRates }],
    };
  case 'DEL_EXPENSE':
    // console.log(id);
    return {
      ...state,
      expenses: state.expenses.filter((exp) => id !== exp.id),
      total: state.total + Number(total.toFixed(2)),
    };
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
      currencies: [...state.currencies, ...currency],
    };
  case 'TOTAL_EXPENSES':
    return {
      ...state,
      total: state.total + Number(total.toFixed(2)),
    };
  default:
    return state;
  }
};

export default wallet;
