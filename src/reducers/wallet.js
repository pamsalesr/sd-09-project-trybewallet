import * as Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  isFatching: false,
  error: '',
  lastId: -1,

};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Type.REQUEST_CURRENCY:
    return {
      ...state,
      isFatching: true,
    };

  case Type.RECEIVE_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFatching: false,
    };

  case Type.RECEIVE_CURRENCY_FAILURE:
    return {
      ...state,
      error: action.error,
      isFatching: false,
    };

  case Type.ADD_CURRENCY:
    return {
      currencies: action.currency,
    };

  case Type.ADD_EXPENSE: {
    return {
      ...state,
      lastId: action.expense.id,
      expenses: [
        ...state.expenses,
        action.expense,
      ],
    };
  }

  case Type.UPGRADE_EXPENSES: {
    return {
      ...state,
      expenses: action.expenses,
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
