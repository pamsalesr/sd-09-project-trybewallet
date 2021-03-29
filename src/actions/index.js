export const LOGIN = 'LOGIN';
export const EXPENSE = 'EXPENSE';

export const loginAction = (loginInfo) => ({
  type: LOGIN,
  email: loginInfo,
});

export const expenseAction = () => ({
  type: EXPENSE,
});
