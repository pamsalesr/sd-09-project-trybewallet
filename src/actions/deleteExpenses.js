const deleteExpense = (id) => ({
  type: 'DELETE_EXPENSE',
  payload: {
    id,
  },
});

export default deleteExpense;
