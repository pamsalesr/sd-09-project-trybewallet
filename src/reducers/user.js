import { ADD_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: 'usuario@gmail.com',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
