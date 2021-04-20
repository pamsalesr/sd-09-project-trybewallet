import {
  FETCH_CURRENCIES,
  ADD_EXPENSE,
  DEL_EXPENSE,
  EDIT_EXPENSE,
  MOVE_TO_STATE,
  SET_OFF_IS_EDITABLE,
  SET_ON_EDIT_BUTTON,
} from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  globalState: [],
  isEditable: false,
  editButton: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return ({
      ...state,
      currencies: action.currencies,
    });
  case ADD_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses, action.expense],
      editButton: false,
    });
  case DEL_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses.filter((obj) => obj.id !== action.id)],
    });
  case EDIT_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses
        .map((obj) => (action.dataState.id === obj.id ? action.dataState : obj))],
      editButton: false,
    });
  case MOVE_TO_STATE:
    return ({
      ...state,
      globalState: action.globalState,
      isEditable: true,
    });
  case SET_OFF_IS_EDITABLE:
    return ({
      ...state,
      isEditable: false,
    });
  case SET_ON_EDIT_BUTTON:
    return ({
      ...state,
      editButton: true,
    });
  default:
    return state;
  }
};

export default wallet;
