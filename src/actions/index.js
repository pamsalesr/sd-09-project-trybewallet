// Coloque aqui suas actions
export const userAction = (userEmail) => ({
  type: 'REGISTER_EMAIL',
  userEmail,
});

export const addExpense = (expense) => ({
  type: 'REGISTER_EXPENSES',
  expense,
});

export const registerCurrencies = (currencies) => ({
  type: 'REGISTER_CURRENCIES',
  currencies,
});
