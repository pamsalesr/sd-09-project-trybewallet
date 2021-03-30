import { USER_ACTION } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_ACTION:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
