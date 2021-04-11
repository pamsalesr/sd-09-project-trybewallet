// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const value = { expenses: [] };
const Wallet = (state = value, action) => {
  switch (action.type) {
  case 'addExpense':
    return {
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
};

export default Wallet;
