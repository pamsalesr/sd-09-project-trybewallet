import { EXPENSE_SAVE, EXPENSES_UPDATE } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  // exchangeRates: [],
  // totalExpenses: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  // case EXPENSE_TOTAL:
  //   return {
  //     ...state,
  //     totalExpenses: action.totalExpenses,
  //   };
  case EXPENSES_UPDATE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EXPENSE_SAVE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}
