import { LOGIN_INFORMATION } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
    validation: false,
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_INFORMATION:
    return {
      ...state,
      email: action.email,
      validation: action.validation,
    };
  default:
    return state;
  }
}

export default user;
