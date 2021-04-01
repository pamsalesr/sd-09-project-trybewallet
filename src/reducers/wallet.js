const INITIAL_STATE = {};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_CURRENCY_LIST':
    return { ...state, currencies: action.data };
  case 'RECEIVE_CURRENCY_FAIL':
    return { error: action.error };
  default:
    return state;
  }
};

export default walletReducer;
