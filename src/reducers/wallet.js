export const REQUEST_MONEY = 'REQUEST_MONEY';
export const WALLET_INFO = 'WALLET_INFO';
export const MONEY_INFO = 'MONEY_INFO';

const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

function wallet(state = initialState, action) {
  const { type, isFetching, money, expense } = action;
  switch (type) {
  case WALLET_INFO:
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };
  case MONEY_INFO:
    return { ...state, currencies: money, isFetching };
  case REQUEST_MONEY:
    return { ...state, isFetching };
  default:
    return state;
  }
}

export default wallet;
