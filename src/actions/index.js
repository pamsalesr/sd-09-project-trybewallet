export const login = (email) => ({ type: 'LOGIN', email });

export const updateCurr = (currencies) => ({ type: 'UPDATE_CURR', currencies });

export const updateExpenses = (expenses) => ({ type: 'UPDATE_EXPENSES', expenses });
