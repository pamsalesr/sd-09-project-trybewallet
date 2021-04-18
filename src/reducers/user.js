import { ADD_USER } from '../actions/types';

const INITIAL_USER = {
  email: '',
};

const userReducer = (state = INITIAL_USER, { type, payload }) => {
  switch (type) {
  case ADD_USER:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
};

export default userReducer;
