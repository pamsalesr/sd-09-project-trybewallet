import { EXPENSE_SAVE, EXPENSES_UPDATE, EDIT_BUTTON } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  editButton: false,
  expenseId: 0,
  // exchangeRates: [],
  // totalExpenses: 0,
};

const dropExpense = () => {
  // const reNew = expenses.filter((expense) => (item !== expense.id));
  // dispatchExpensesUpdate(reNew);
  console.log(INITIAL_STATE.expenseId);
  // transforma a possição em null
  // if(item >= 3){
  delete INITIAL_STATE.expenses[INITIAL_STATE.expenseId];
  // }
  // let testes = expenses
  // }
  console.log('afdfasdfasdfasdfasdfasdfasdfasdfasdfa');
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EDIT_BUTTON:
    return {
      ...state,
      editButton: action.editButton,
      expenseId: action.expenseId,
      // expenses : state.expenses.map((expense) => {
      //   if (expense.id === action.expense.id) {
      //     return action.expense;
      //   }
      //   return expense;
      // }),
    };
  case EXPENSES_UPDATE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EXPENSE_SAVE:
    // dropExpense();
    if (INITIAL_STATE.editButton === true) {
      dropExpense();
      return {
        ...state,
        expenses: [...state.expenses, action.expenses],
      };
    } return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
