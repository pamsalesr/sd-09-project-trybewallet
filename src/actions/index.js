// Coloque aqui suas actions
import { LOGIN } from '../reducers/user';
import {
  CREATE_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  RETRIEVE_EXPENSE,
} from '../reducers/wallet';

export const getExpense = (id) => ({ type: RETRIEVE_EXPENSE, id });

export const createExpense = (expense) => ({ type: CREATE_EXPENSE, expense });

export const updateExpense = (expense) => ({ type: UPDATE_EXPENSE, expense });

export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, id });

export const authLogin = (user) => ({ type: LOGIN, user });
