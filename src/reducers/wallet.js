// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
  currencyField: 'USD',
};

function wallet(state = INITIAL_STATE, action) {
  const expensesActualId = state.expenses.length;
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return { ...state, isFetching: true };
  case 'RESPONSE_CURRENCY_EXPENSES':
    return {
      ...state,
      isFetching: false,
      exchangeRatesHolder: action.response,
    };
  case 'RESPONSE_CURRENCY_LIST':
    return {
      ...state,
      isFetching: false,
      currencies: Object.keys(action.response),
    };
  case 'REQUEST_FAILED':
    return { ...state, isFetching: false, error: action.error };
  case 'ADD_EXPEND':
    return {
      ...state,
      expenses: [...state.expenses,
        {
          ...action.data,
          id: expensesActualId,
          exchangeRates: state.exchangeRatesHolder,
        },
      ],
    };
  case 'UPDATE_EXPENSES_LIST':
    return {
      ...state,
      expenses: action.updatedExpensesList,
    };
  case 'UPDATE_CURRENCY_FIELD':
    return {
      ...state,
      currencyField: action.currencyString,
    };
  default:
    return state;
  }
}

export default wallet;
