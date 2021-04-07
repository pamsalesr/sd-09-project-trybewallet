import { IS_LOGGED_IN, ADD_USER } from '../actions';

const INITIAL_USER_STATE = {
  email: '',
  isLoggedIn: false,
};

const userReducer = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case IS_LOGGED_IN:
    return {
      ...state,
      isLoggedIn: action.loggedIn,
    };
  case ADD_USER:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
