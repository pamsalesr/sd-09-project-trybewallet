const INITIAL_STATE = {};
const wallet = 'wallet';

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case wallet:
    return 0;
  default:
    return state;
  }
};

export default walletReducer;
