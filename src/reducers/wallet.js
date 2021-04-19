export const REQUEST_MONEY = 'REQUEST_MONEY';
export const WALLET_INFO = 'WALLET_INFO';
export const MONEY_INFO = 'MONEY_INFO';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case WALLET_INFO:
    return {
      ...state,
      currencies: action.currency,
      expenses: action.expense,
    };
  default:
    return state;
  }
}

const firstState = {
  money: [],
  isFetching: false,
};

export const moneyInfo = (state = firstState, action) => {
  switch (action.type) {
  case MONEY_INFO:
    return { ...state, money: action.money, isFetching: false };
  case REQUEST_MONEY:
    return { ...state, isFetching: true };
  default:
    return state;
  }
};

export default wallet;
