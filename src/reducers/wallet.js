// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCIES,
  RESOLVED_CURRENCIES,
  REJECT_CURRENCIES,
  REQUEST_EXPENSE,
  RESOLVED_EXPENSE,
  REJECT_EXPENSE,
  DELETE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  loadingCurrencies: false,
  loadingExpense: false,
  currencies: [],
  expenses: [],
};

const addId = (state, expense) => ({ ...expense, id: (state.length) });

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, loadingCurrencies: true };
  case RESOLVED_CURRENCIES:
    return { ...state, loadingCurrencies: false, currencies: action.currency };
  case REJECT_CURRENCIES:
    return { ...state, loadingCurrencies: false, error: action.error };
  case REQUEST_EXPENSE:
    return { ...state, loadingExpense: true };
  case RESOLVED_EXPENSE:
    return {
      ...state,
      loadingExpense: false,
      expenses: [...state.expenses, addId(state.expenses, action.expense)],
    };
  case REJECT_EXPENSE:
    return { ...state, loadingExpense: false, error: action.error };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id) };
  default:
    return state;
  }
};

export default wallet;
