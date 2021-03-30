import { DELETE } from './actionsTypes';

const deleteExpenseAction = (newExpenses) => ({
  type: DELETE,
  newExpenses,
});

export default deleteExpenseAction;
