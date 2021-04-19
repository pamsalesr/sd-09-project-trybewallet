const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_LOGIN':
    return {
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default user;
