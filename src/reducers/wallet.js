// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES, REMOVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const expenses = (state = INITIAL_STATE, action) => {
  // console.log('Action expenses recebida: ', action.type);
  switch (action.type) {
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.id),
      ],
    };
  default:
    return state;
  }
};

export default expenses;
