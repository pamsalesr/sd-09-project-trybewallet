import { GET_CURRENCIES, GET_EXPENSES } from '../actions/coinAPIAction';
import { REMOVEITEM_ACTION, EDITITEM_ACTION } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: [...action.currencies] };
  case GET_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case REMOVEITEM_ACTION:
    return { ...state, expenses: [...action.expenses] };
  case EDITITEM_ACTION:
    return { ...state, expenses: [...action.editItem] };
  default:
    return state;
  }
};

export default walletReducer;
