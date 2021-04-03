// import { ADD_USER } from '../actions';

const INITIAL_WALLET_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletReducer = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default walletReducer;
