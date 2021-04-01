// Coloque aqui suas actions
export const userEmailActions = (email) => ({
  type: 'EMAIL_INPUT',
  email,
});

export const addExpensesActions = (expenses) => ({
  type: 'ADD_EXPENSES',
  expenses,
});

export const RemoveExpensesActions = (id) => ({
  type: 'REMOVE_EXPENSES',
  id,
});
