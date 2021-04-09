// Esse reducer será responsável por tratar as informações da pessoa usuária
const INICIAL_STATE = {
  email: '',
};

const user = (state = INICIAL_STATE, action) => {
  switch(action.type) {
  case '':
    return { };
  default:
    return state;
  }
};

export default user;
