export const setUserEmail = (user) => ({ type: 'SET_EMAIL', user });
export const addExpense = (expenses) => ({ type: 'ADD_EXPENSE', payload: [expenses] });
export const sumExpenses = (value) => ({ type: 'SUM_EXPENSES', payload: value });
