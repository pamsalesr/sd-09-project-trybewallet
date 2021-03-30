import * as Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.Type) {
  case Type.ADD_CURRENCY:
    return {
      wallet: {
        currencies: [
          ...state.wallet.currencies, {
            code: action.code,
            name: action.name,
          },
        ],
      },
    };
  case Type.ADD_EXPENSE: {
    return {
      wallet: {
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
      },
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
