import {
  ADD_CURRENCY,
  ADD_EXPANSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_EXPENSE_FOR_ID,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencys: [],
  expenses: [],
  numberExpense: 0,
  // totalExpense: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCY:
    return {
      ...state,
      currencys: [...action.currencys],
    };
  case ADD_EXPANSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.numberExpense,
          value: action.value,
          description: action.description,
          tag: action.tag,
          currency: action.currency,
          method: action.payment,
          exchangeRates: action.exchangeRates,
        },
      ],
      numberExpense: state.numberExpense + 1,
      // totalExpense: state.totalExpense + action.totalExpense,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expanse) => expanse !== state.expenses[action.index]),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editActivated: action.editActivated,
      editID: action.editID,
    };
  case EDIT_EXPENSE_FOR_ID:
    return {
      ...state,
      editActivated: action.editActivated,
      expenses: state.expenses
        .map((obj) => (obj.id === action.editID ? action.expense : obj)),
    };
  default:
    return state;
  }
};

export default wallet;
