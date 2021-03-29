import React from 'react';

class Login extends React.Component {
  render() {
    return(
      <main>
        <h3>Login</h3>
        <input
          type="email"
          placeholder="Endereço de e-mail"
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
        />
        <button type="submit">Entrar</button>
      </main>
    );
  }
}

export default Login;
