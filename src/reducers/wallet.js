import { RECEIVE_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const expensesReducer = (state = initialState, action) => {
  const { type, expense, currencies, expenses } = action;
  switch (type) {
  case RECEIVE_CURRENCIES:
    return { ...state, currencies };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...expense, id: state.expenses.length },
      ],
    };
  case DELETE_EXPENSE:
    return { ...state, expenses };
  default:
    return state;
  }
};

export default expensesReducer;
