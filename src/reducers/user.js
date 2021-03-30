const INITIAL_STATE = {
  email: '',
  password: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return { email: action.email,
      password: action.email,
    };
  default:
    return state;
  }
}

export default userReducer;
// Esse reducer será responsável por tratar as informações da pessoa usuária
