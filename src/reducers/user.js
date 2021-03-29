import { types } from '../actions';

const INITIAL_STATE = { email: '' };

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.SET_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
