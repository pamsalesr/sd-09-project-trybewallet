import { ADD_EXPENSE, DELETE, USER_CURRENCIES } from '../store/constantes';

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
    const newExpense = {
      id: state.idCount,
      ...action.payload,
    };
    return { ...state,
      expenses: [...state.expenses, newExpense],
      idCount: state.idCount + 1 };
  }
  case DELETE: {
    return { ...state, expenses: [...action.payload] };
  }
  default:
    return state;
  }
};

export default walletReducer;
