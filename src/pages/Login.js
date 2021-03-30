import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Jhon Wallet</h1>
        <form>
          <label htmlFor="email">
            E-mail
            <input type="email" name="email" data-testid="email-input" required />
          </label>
          <label htmlFor="senha">
            Senha
            <input type="password" name="senha" data-testid="password-input" required />
          </label>
          <button type="button" name="entrar">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
