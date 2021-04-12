export const USER_DATA = 'USER_DATA';

const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case USER_DATA:
    state = { ...state,
      email: action.email };
    return state;
  default:
    // console.log(state);
    return state;
  }
}

export default user;
