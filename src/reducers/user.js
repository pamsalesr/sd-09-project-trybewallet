// Esse reducer será responsável por tratar as informações da pessoa usuária

const LOGIN = 'LOGIN';
const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN: return (
    {
      email: action.userLogin,
    }
  );
  default: return state;
  }
};

export default user;
