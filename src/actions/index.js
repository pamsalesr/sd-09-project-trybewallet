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

export const GETITEM_ACTION = 'GETITEM_ACTION';

export const getItemAction = (getState) => ({ type: GETITEM_ACTION, getState });

export const EDITSTATE_ACTION = 'EDITSTATE_ACTION ';

export const editStateAction = (name, value) => ({ type: EDITSTATE_ACTION, name, value });

export const RESETSTATE_ACTION = 'RESETSTATE_ACTION';

export const resetStateAction = () => ({ type: RESETSTATE_ACTION });

export const EDITITEM_ACTION = 'EDITITEM_ACTION';

export const editItemAction = (editItem) => ({ type: EDITITEM_ACTION, editItem });
