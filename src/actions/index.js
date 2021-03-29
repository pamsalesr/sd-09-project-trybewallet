export const LOGIN_USER = 'LOGIN_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const handleUserLogin = (userData) => ({
  type: LOGIN_USER,
  userData,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});
