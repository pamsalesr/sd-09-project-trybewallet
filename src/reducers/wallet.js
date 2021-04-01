const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function myReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SEND_OBJ':
    return { ...state, currencies: action.obj };
  case 'SEND_EXP':
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}

export default myReducer;
