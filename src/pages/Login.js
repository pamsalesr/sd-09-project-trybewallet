import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="Email">
            Email:
            <input type="text" name="email" data-testid="email-input" />
          </label>
          <label htmlFor="Senha">
            Senha:
            <input type="text" name="senha" data-testid="password-input" />
          </label>
        </form>
        <button type="button">Entrar</button>
      </div>
    );
  }
}

export default Login;
