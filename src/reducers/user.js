import SAVE_EMAIL from '../actions/actionTypes';

const initialState = {
  user: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    email = action.user;
    return {
      ...state, email,
    };
  default:
    return state;
  }
}

export default user;
