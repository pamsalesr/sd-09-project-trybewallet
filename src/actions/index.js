export const SIGNIN = '@TRYBEWALLET/LOGIN';
export const SAVE_CURRENCIES = '@TRYBEWALLET/SAVE_CURRENCIES';
export const SAVE_EXPENSES = '@TRYBEWALLET/SAVE_EXPENSE';

export const signin = (email) => ({
  type: SIGNIN,
  payload: email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: expenses,
});
