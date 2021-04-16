import
{ ADD_EXPENSE, DELETE, USER_CURRENCIES, EDITING, EDIT_COMPLETE, EDIT }
  from
  '../store/constantes';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET = ({
  currencies: [],
  expenses: [],
  idCount: 0,
});

const walletReducer = (state = INITIAL_WALLET, action) => {
  switch (action.type) {
  case USER_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE: {
    /* const newExpense = {
      id: state.idCount,
      ...action.payload,
    };
    return { ...state,
      expenses: [...state.expenses, newExpense],
      idCount: state.idCount + 1 }; */
    return { ...state, expenses: [...state.expenses, action.payload] };
  }
  case DELETE: {
    return { ...state, expenses: [...action.payload] };
  }
  case EDIT:
    return { ...state, item: action.payload, status: true, btnStatus: true };
  case EDITING:
    return { ...state, status: false, btnStatus: true };
  case EDIT_COMPLETE:
    return { ...state, item: {}, status: false, btnStatus: false };
  default:
    return state;
  }
};

export default walletReducer;
