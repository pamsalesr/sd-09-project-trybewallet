import { LOGIN } from '../actions/actionTypes';

const INITIAL_LOGIN_STATE = {
  email: '',
};

const user = (state = INITIAL_LOGIN_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
