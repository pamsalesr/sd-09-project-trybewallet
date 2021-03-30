import * as Type from './actionsTypes';

export function addUser(email) {
  return {
    type: Type.ADD_USER,
    email,
  };
}

export function addCurrency(code, name) {
  return {
    type: Type.ADD_CURRENCY,
    code,
    name,
  };
}

export function addExpense(expense) {
  return {
    type: type.ADD_EXPENSE,
    id: expense.id,
    value: expense.value,
    description: expense.description,
    currency: expense.currency,
    method: expense.method,
    tag: expense.tag,
    exchangeRates: expense.exchangeRates,
  };
}
