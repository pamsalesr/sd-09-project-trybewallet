// Coloque aqui suas actions

export const EMAIL_INSERT = 'EMAIL_INSERT';
export const emailInsert = (email) => ({
  type: EMAIL_INSERT,
  email,
});

export const PASSWORD_INSERT = 'PASSWORD_INSERT';
export const passwordInsert = (password) => ({
  type: PASSWORD_INSERT,
  password,
});

// Wallet

// export const EXPENSE_TOTAL = 'DESPESA_TOTAL';
// export const totalExpensesInsert = (totalExpenses) => ({
//   type: EXPENSE_TOTAL,
//   totalExpenses,
// });

export const EXPENSE_SAVE = 'EXPENSE_SAVE';
export const expenseInsert = (expenses) => ({
  type: EXPENSE_SAVE,
  expenses,
});

export const EXPENSES_UPDATE = 'EXPENSES_UPDATE';
export const expensesUpdate = (expenses) => ({
  type: EXPENSES_UPDATE,
  expenses,
});
