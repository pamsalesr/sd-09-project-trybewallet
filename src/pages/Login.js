import React from 'react';
import FormLogin from './FormLogin';

class Login extends React.Component {
  render() {
    return (
      <section>
        <div>Login</div>
        <FormLogin />
      </section>
    );
  }
}
// requisito 1
// A rota para esta página deve ser ‘/’.
// Salve o email no estado da aplicação, com a chave email, assim que a pessoa usuária logar.

export default Login;
