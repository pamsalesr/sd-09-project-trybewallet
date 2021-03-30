// Coloque aqui suas actions
import { LOGIN } from '../reducers/user';
import {
  CREATE_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  RETRIEVE_EXPENSE,
} from '../reducers/wallet';

export const getExpense = (id) => {
  return { type: RETRIEVE_EXPENSE, id };
};

export const createExpense = (expense) => {
  return { type: CREATE_EXPENSE, expense };
};

export const updateExpense = (expense) => {
  return { type: UPDATE_EXPENSE, expense };
};

export const deleteExpense = (id) => {
  return { type: DELETE_EXPENSE, id };
};

export const authLogin = (user) => {
  return { type: LOGIN, user };
};
