const LOGIN = 'LOGIN';
const EXPENSE = 'EXPENSE';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const expenseAction = (expense) => ({
  type: EXPENSE,
  expense,
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
