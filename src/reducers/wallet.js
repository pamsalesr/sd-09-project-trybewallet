// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  // totalExpense: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_TO_WALLET':
    return {
      // ...state, wallet: state.wallet.concat(action.payload.expense),
      expenses: [...state.expenses, action.expense],
      // totalExpense: (state.totalExpense) + Number(action.expense.value),
    };
  // https://stackoverflow.com/questions/34582678/is-this-the-correct-way-to-delete-an-item-using-redux
  case 'DELETE_ITEM':
    return {
      ...state,
      expenses: state.expenses.filter((expense, index) => index !== action.item),
    };
  case 'GET_CURRENCY':
    return ({
      ...state,
      currencies: action.currency,
    });
  default:
    return state;
  }
};

export default walletReducer;
