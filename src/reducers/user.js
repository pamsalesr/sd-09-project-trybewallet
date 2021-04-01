import * as Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Type.ADD_USER:
    return {
      email: action.email,
    };
  default:
    return state;
  }
}

export default userReducer;
