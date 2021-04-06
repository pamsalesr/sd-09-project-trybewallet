// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY_ACTION, SET_EXPENSES_ACTION } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

export default function currencyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY_ACTION:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SET_EXPENSES_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}
