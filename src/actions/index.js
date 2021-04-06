export const LOGGED_IN = 'LOGGED_IN';
export const SUBMIT_EXPENSE = 'SUBMIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

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

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});
