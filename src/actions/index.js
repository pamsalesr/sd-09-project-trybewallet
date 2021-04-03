export const login = (email) => ({ type: 'LOGIN', email });
export const setCurrencies = (currencies) => ({ type: 'SET_CURRENCIES', currencies });
export const setExpenses = (expenses) => ({ type: 'SET_EXPENSES', expenses });
export const addExpense = (expense) => ({ type: 'ADD_EXPENSE', expense });
export const setEdit = (condition, id) => ({ type: 'SET_EDIT', condition, id });
