// Coloque aqui suas actions
export const registerEmailAction = (email) => ({
  type: 'REGISTER_EMAIL',
  email,
});

export const addExpenseAction = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const registerCurrenciesAction = (currencies) => ({
  type: 'REGISTER_CURRENCIES',
  currencies,
});
