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

export function forsmAddState(obj) {
  return {
    type: 'forsmAddState',
    obj,
  };
}

export function addExchangeRates(state) {
  return {
    type: 'addExchangeRates',
    state,
  };
}

export function addState(value, name) {
  return {
    type: 'addState',
    value,
    name,
  };
}

export function addStateForms(obj) {
  return {
    type: 'addStateForms',
    obj,
  };
}

export function addId() {
  return {
    type: 'addId',
  };
}

export function addTrue(obj) {
  return {
    type: 'true',
    obj,
  };
}

export function addFalse() {
  return {
    type: 'false',
  };
}
