import { types } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
};

export default function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.ADD_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.concat({ ...action.expense, id: state.id }),
      id: state.id + 1,
    };
  default:
    return state;
  }
}
