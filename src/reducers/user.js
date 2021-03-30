import * as Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.Type) {
  case Type.ADD_USER:
    return {
      user: {
        email: action.email,
      },
    };
  default:
    return state;
  }
}

export default userReducer;
