const LOGIN = 'LOGIN';
const EXPENSE = 'EXPENSE';
const DELETE = 'DELETE';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const expenseAction = (expense) => ({
  type: EXPENSE,
  expense,
});

export const deleteExpenseAction = (newExpenses) => ({
  type: DELETE,
  newExpenses,
});

export async function expenseThunk(
  { id,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates },
) {
  return async (dispatch) => {
    dispatch(expenseAction(
      { id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates },
    ));
  };
}
