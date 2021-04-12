export const USER_DATA = 'USER_DATA';

const initialState = {
  user: {
    email: '',
  },
};

function user(state = initialState, action) {
  switch (action.type) {
  case USER_DATA:
    state = { email: action.email };
    return state;
  default:
    return state;
  }
}

export default user;
