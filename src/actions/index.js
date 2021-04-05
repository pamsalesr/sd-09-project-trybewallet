export const login = (email) => ({ type: 'LOGIN', email });
export const addExpense = (data) => ({ type: 'ADD_EXPENSE', data });
export const setEditExpense = (data) => ({ type: 'SET_EDIT', data });
export const delExpense = (data) => ({ type: 'DELETE_EXPENSE', data });
export const updateCurrencies = (data) => ({ type: 'UPDATE_CURRENCIES', data });
export const editExpense = (status, id) => ({ type: 'EDIT_EXPENSE', status, id });
