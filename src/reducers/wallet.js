import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SEND_TO_EDIT,
  FINISH_EDIT,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_START:
    return ({
      ...state,
      loading: true,
    });
  case FETCH_SUCCESS:
    return ({
      ...state,
      loading: false,
      currencies: [...Object.keys(action.data)],
    });
  case FETCH_FAIL:
    return ({
      ...state,
      loading: false,
      error: action.error,
    });
  case ADD_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses, action.expense],
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    });
  case SEND_TO_EDIT:
    return ({
      ...state,
      expenseToEdit: action.expense,
      isEditing: true,
    });
  case FINISH_EDIT:
    return ({
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expense.id) {
          return ({ ...expense, ...action.expense });
        }
        return expense;
      }),
      isEditing: false,
    });
  default:
    return state;
  }
};

export default wallet;
