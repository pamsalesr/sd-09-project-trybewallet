// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
  loggedIn: false,
};

const userReducer = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      loggedIn: true,
      user: {
        email,
      },
    };
  default:
    return state;
  }
};

export default userReducer;
