export const USER_ACTION = 'USER_ACTION';

export const userAction = (email) => ({ type: USER_ACTION, email });

export const REMOVEITEM_ACTION = 'REMOVEITEM_ACTION';

export const removeItem = (expenses, id) => {
  const expensesFilter = expenses
    .filter((expense) => expense.id !== id);
  return ({
    type: REMOVEITEM_ACTION,
    expenses: expensesFilter,
  });
};
