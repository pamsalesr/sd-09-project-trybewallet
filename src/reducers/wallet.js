import * as Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
  lastId: -1,
  idToEdit: 0,
  editor: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Type.ADD_EXPENSE: {
    return {
      ...state,
      lastId: action.expense.id,
      expenses: [
        ...state.expenses,
        action.expense,
      ],
    };
  }
  case Type.EDIT_EXPENSE: {
    return {
      ...state,
      idToEdit: action.idToEdit,
      editor: action.editor,
    };
  }
  case Type.UPGRADE_EXPENSES: {
    return {
      ...state,
      expenses: action.expenses,
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
