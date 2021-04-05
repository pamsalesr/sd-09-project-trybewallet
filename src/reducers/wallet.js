const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRate: {},
  totalExpenses: 0,
};

const ADD_TO_WALLET = 'ADD_TO_WALLET';
const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
const SEND_INFOS = 'SEND_INFOS';

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_TO_WALLET:
    return { ...state,
      expenses: [...state.expenses, action.payload],
      totalExpenses: state.totalExpenses + action.expense };
  case SEND_INFOS:
    return { ...state, exchangeRate: action.payload };
  case RECEIVE_CURRENCIES:
    return { ...state, currencies: action.payload };
  case REQUEST_CURRENCIES:
    return { ...state, asyncWorkin: action.payload };
  default:
    return state;
  }
}

export default wallet;
