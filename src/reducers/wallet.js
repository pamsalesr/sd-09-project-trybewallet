import { ADD_EXPENSE, RECEIVE_CURRENCIES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const expensesReducer = (state = initialState, action) => {
  const { type, expense, currencies } = action;
  switch (type) {
  case RECEIVE_CURRENCIES:
    return { ...state, currencies };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };
  default:
    return state;
  }
};

export default expensesReducer;
