const EXPENSE = 'EXPENSE';
const DELETE = 'DELETE';

export const expenseAction = (expense) => ({
  type: EXPENSE,
  expense,
});

export const deleteExpense = (newExpenses) => ({
  type: DELETE,
  newExpenses,
});
