const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

export default function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}
