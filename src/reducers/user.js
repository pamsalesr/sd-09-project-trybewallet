// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
  baseDataEmails: [
    { email: 'losalucard@hotmail.com', pass: '123456' },
    { email: 'alguem@email.com', pass: '123456' },
    { email: 'joao@useLocation.com.br', pass: '123' }],
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USERLOGIN':
    return {
      email: action.userEmail,
      baseDataEmails: [...state.baseDataEmails],
    };
  case 'ADDNEWUSER':
    return {
      email: state.email,
      baseDataEmails: [...state.baseDataEmails, action.newData],
    };
  default:
    return state;
  }
}

export default user;
