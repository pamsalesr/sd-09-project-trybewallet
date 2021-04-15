import { LOGIN } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      email: action.credentials.email,
      password: action.credentials.password };
  default:
    return state;
  }
}

export default userReducer;
