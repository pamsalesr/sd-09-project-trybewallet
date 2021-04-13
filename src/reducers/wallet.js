import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  FAILED_REQUEST,
  ADD_EXPENSE_STATE,
  UPDATE_EXPENSE_STATE,
  DELETE_EXPENSE_STATE,
  EDIT_EXPENSE,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE_WALLET = {
  isFetching: false,
  editor: false,
  idToEdit: 0,
  currencyToExchange: 'BRL',
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: action.isFetching,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      currencies: [],
    };
  case ADD_EXPENSE_STATE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case UPDATE_EXPENSE_STATE:
    return {
      ...state,
      expenses: action.expenses,
      editor: false,
      idToEdit: 0,
    };
  case DELETE_EXPENSE_STATE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: action.editor,
      idToEdit: action.idToEdit,
    };
  default:
    return state;
  }
}

export default wallet;
