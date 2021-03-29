const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
};

function wallet(noWallet = INITIAL_WALLET, action) {
  switch (action.type) {
  case 'VALID_WALLET':
    return {
      currencies: action.currencies,
      expenses: action.expenses,
    };
  default:
    return noWallet;
  }
}

export default wallet;
