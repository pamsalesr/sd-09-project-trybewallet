// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY_ACTION, SET_EXPENSES_ACTION, SET_TOTAL_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currency: {},
  expenses: [],
  totalExpenses: 0,
};

export default function currencyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY_ACTION:
    return {
      ...state,
      currency: action.currency,
    };
  case SET_EXPENSES_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case SET_TOTAL_EXPENSES:
    return {
      ...state,
      totalExpenses: action.totalExpenses,
    };
  default:
    return state;
  }
}
