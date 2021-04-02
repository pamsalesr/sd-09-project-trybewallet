const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
};

function wallet(noWallet = INITIAL_WALLET, action) {
  switch (action.type) {
  case 'VALID_WALLET':
    return action.wallet;
  default:
    return noWallet;
  }
}

export default wallet;
