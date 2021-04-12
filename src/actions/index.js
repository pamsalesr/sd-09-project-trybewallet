// Coloque aqui suas actions
export function addEmail(email) {
  return {
    type: 'addUser',
    email,
  };
}

export function addDespesa(despesa) {
  return {
    type: 'addDespesa',
    despesa,
  };
}

export function addExpense(expense) {
  return {
    type: 'addExpense',
    expense,
  };
}

export function addNewExpenses(newExpenses) {
  return {
    type: 'newExpenses',
    newExpenses,
  };
}
export function removeDespesa(despesa) {
  return {
    type: 'removeDespesa',
    despesa,
  };
}
