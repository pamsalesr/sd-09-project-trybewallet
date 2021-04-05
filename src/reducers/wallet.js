import * as Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFatching: false,
  error: '',

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
      expenses: [
        ...state.wallet.expenses, {
          id: action.id,
          value: action.value,
          description: action.description,
          currency: action.currency,
          method: action.method,
          tag: action.tag,
          exchangeRates: action.exchangeRates,
        },
      ],
    };
  }

  default:
    return state;
  }
}

export default walletReducer;
