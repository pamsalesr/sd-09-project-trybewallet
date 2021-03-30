import { LOGIN, ADD, DELETE } from './ActionsDescribe';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const launchOperation = (launch) => ({
  type: ADD,
  launch,
});
