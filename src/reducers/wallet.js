// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import * as actions from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  nextExpenseId: 0,
  fetching: false,
  editing: -1,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actions.ADD_SPENDING:
    return {
      ...state,
      fetching: true,
    };
  case actions.ADD_SPENDING_SUCCESS:
    if (state.editing >= 0) {
      return {
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
        editing: -1,
      };
    }
    return {
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
    };
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
  default:
    return state;
  }
};

export default wallet;
