export const GET_USER_EMAIL = 'GET_USER_EMAIL';

export const getUserEmail = (email) => ({
  type: GET_USER_EMAIL,
  userEmail: email,
});

export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addExpenses = (currExpenses) => ({
  type: ADD_EXPENSES,
  expenses: currExpenses,
});
