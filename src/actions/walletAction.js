const EXPENSE = 'EXPENSE';

const expenseAction = (expense) => ({
  type: EXPENSE,
  expense,
});

export default expenseAction;
