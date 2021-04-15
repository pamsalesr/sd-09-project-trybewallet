// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import * as actions from '../actions/index';

const INITIAL_STATE = {
  currenciesFetched: false,
  currencies: [],
  expenses: [],
  nextExpenseId: 0,
  fetching: false,
  editing: -1,
};

const addSpendingSuccess = (state, action) => ({
  ...state,
  fetching: false,
  expenses: [
    ...state.expenses,
    {
      id: state.nextExpenseId,
      ...action.input,
      exchangeRates: action.fetchData,
    },
  ],
  nextExpenseId: state.nextExpenseId + 1,
});

const editSpending = (state, action) => ({
  ...state,
  expenses: state.expenses.map((expense) => {
    if (expense.id === action.id) {
      return {
        ...expense,
        ...action.input,
      };
    }
    return expense;
  }),
});

const wallet = (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
  case actions.FETCH_CURRENCIES:
  case actions.ADD_SPENDING:
    return {
      ...state,
      fetching: true,
    };
  case actions.ADD_SPENDING_SUCCESS:
    return addSpendingSuccess(state, action);
  case actions.EDIT_SPENDING:
    return editSpending(state, action);
  case actions.REMOVE_SPENDING:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case actions.TRIGGER_EDITING:
    return {
      ...state,
      editing: action.id,
    };
  case actions.SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
      currenciesFetched: true,
    };
  default:
    return state;
  }
};

export default wallet;
