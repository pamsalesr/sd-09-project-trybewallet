import {
  RECEIVE_CURRENCY,
  RECEIVE_CURRENCY_ERROR,
  RECEIVE_EXPENSES, TOTAL_EXPENSES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  error: '',
  isFetching: false,
  // editor: false,
  // idToEdit: 0,
  // eles são para permitir a edição e pegar o id daquele que será alterado(despesa)
  currencyToExchange: 'BRL',
  currencies: [],
  totalExpenses: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCY:
    return {
      ...state,
      currencies: action.currencies,
    };
  case RECEIVE_CURRENCY_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case RECEIVE_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  case TOTAL_EXPENSES:
    return {
      ...state,
      totalExpenses: action.total,
    };
  default:
    return state;
  }
};

export default wallet;
