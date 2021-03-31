// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  const expenseWithCurrencies = {
    ...action.expense,
    exchangeRates: action.data,
  };

  switch (action.type) {
  case 'ADD_EXPENSE':

    return {
      ...state,
      expenses: [...state.expenses, expenseWithCurrencies],
    };

  case 'RECEIVE_CURRENCIES':
    return {
      ...state,
      currencies: action.data,
    };

  default:
    return state;
  }
};

export default wallet;
