export const types = {
  SET_EMAIL: 'SET_EMAIL',
  ADD_EXPENSE: 'ADD_EXPENSE',
};

function setEmail(email) {
  return {
    type: types.SET_EMAIL,
    email,
  };
}

function addExpense(expense) {
  return {
    type: types.ADD_EXPENSE,
    expense,
  };
}

export default {
  setEmail,
  addExpense,
};
