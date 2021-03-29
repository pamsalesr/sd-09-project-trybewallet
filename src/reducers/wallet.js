import { ADD_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const expensesReducer = (state = initialState, action) => {
  const { type, expense } = action;
  switch (type) {
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
