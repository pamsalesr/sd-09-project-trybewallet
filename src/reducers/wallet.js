import {
  ADD_COST,
  DELETE_COST,
  REQUEST_COIN,
  RECEIVE_COIN,
} from '../actions/ActionsDescribe';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COIN:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_COIN:
    return ({
      ...state,
      isFetching: false,
      currencies: [...Object.keys(action.coins)],
    });
  case ADD_COST:
    return ({
      ...state,
      expenses: [...state.expenses, action.cost],
    });
  case DELETE_COST:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.cost),
    });
  default:
    return state;
  }
};

export default wallet;
