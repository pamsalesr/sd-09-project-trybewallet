export const LOGGED_IN = 'LOGGED_IN';
export const SUBMIT_EXPENSE = 'SUBMIT_EXPENSE';
export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';

export const loggedInAction = (email) => ({
  type: LOGGED_IN,
  email,
});

export const submitExpense = ({
  id,
  value,
  description,
  currency,
  method,
  tag,
  exchangeRates,
}) => ({
  type: SUBMIT_EXPENSE,
  id,
  value,
  description,
  currency,
  method,
  tag,
  exchangeRates,
});

export const loadCurrencies = (currencies) => ({
  type: LOAD_CURRENCIES,
  currencies,
});
