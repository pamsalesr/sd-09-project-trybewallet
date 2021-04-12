const WALLET_INFO = 'WALLER_INFO';

const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case WALLET_INFO:
    return { wallet: { currencies: action.currency, expenses: action.expense } };
  default:
    return state;
  }
}

export default wallet;
