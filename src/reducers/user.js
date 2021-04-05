import * as Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
  button: true,
  shouldRedirect: false,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Type.ADD_USER:
    return {
      email: action.email,
      password: action.password,
      button: action.button,
      shouldRedirect: action.shouldRedirect,
    };
  default:
    return state;
  }
}

export default userReducer;
