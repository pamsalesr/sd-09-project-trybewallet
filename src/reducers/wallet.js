import { EXPENSE_TOTAL, EXPENSE_SAVE } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  // exchangeRates: [],
  totalExpenses: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSE_TOTAL:
    return {
      ...state,
      totalExpenses: action.totalExpenses,
    };
  // case EXPENSE_RATE_SAVE:
  // return {
  //   ...state,
  //   exchangeRates: action.exchangeRates,
  // };
  case EXPENSE_SAVE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}
