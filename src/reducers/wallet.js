import { RECEIVE_CURRENCIES, ADD_EXPENSE,
  DELETE_EXPENSE, RECEIVE_EXPENSE_EDITIONS } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const replacedExpenses = (expenses, expense) => {
  const expensesCopy = expenses.slice();
  const indexOfExpenses = expensesCopy.findIndex(({ id }) => id === expense.id);
  expensesCopy[indexOfExpenses] = expense;
  return expensesCopy;
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
  case RECEIVE_EXPENSE_EDITIONS:
    return {
      ...state,
      expenses: replacedExpenses(state.expenses, expense),
    };
  default:
    return state;
  }
};

export default expensesReducer;
