import { ADD_USER, NEW_TOTAL } from '../actions/types';

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
  case NEW_TOTAL:
    return {
      ...state,
      total: payload.total,
    };
  default:
    return state;
  }
};

export default userReducer;
