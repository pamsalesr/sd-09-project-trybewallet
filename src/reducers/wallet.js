// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const value = { expenses: [] };
const Wallet = (state = value, action) => {
  switch (action.type) {
  case 'addExpense':
    return {
      expenses: [...state.expenses, action.expense],
    };
  case 'newExpenses':
    return {
      expenses: action.newExpenses,
    };
  default:
    return state;
  }
};

export default Wallet;
