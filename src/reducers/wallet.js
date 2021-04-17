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
};

export const moneyInfo = (state = firstState, action) => {
  switch (action.type) {
  case MONEY_INFO:
    return { ...state, money: action.money };
  default:
    return state;
  }
};

export default wallet;
