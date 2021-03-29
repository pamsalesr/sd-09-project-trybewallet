import { ADD_EXPANSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions/actionTypes';

const INITIAL_STATE = {
  expenses: [],
  numberExpense: 0,
  totalExpense: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
      totalExpense: state.totalExpense + action.totalExpense,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expanse) => expanse !== state.expenses[action.index]),
      totalExpense: parseFloat(state.totalExpense) - parseFloat(action.expense),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editActivated: action.editActivated,
      editID: action.editID,
    };
  default:
    return state;
  }
};

export default wallet;
