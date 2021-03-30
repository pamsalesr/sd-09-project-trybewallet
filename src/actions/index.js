// Coloque aqui suas actions
// import * as typeActions from './typeActions';

const onSubmitLogin = (state) => ({
  type: 'SUBMIT_LOGIN',
  email: state,
});

export default onSubmitLogin;
