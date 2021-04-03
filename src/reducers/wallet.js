import { GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencyList: {},
  // expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  // case ADD_EXPENSES:
  //   return {
  //     ...state,
  //     expenses: [...state.expenses, action.expenses]
  //   };
  case GET_CURRENCIES:
    return {
      ...state,
      currencyList: action.currencyList,
    };
  default:
    return state;
  }
}

export default wallet;
