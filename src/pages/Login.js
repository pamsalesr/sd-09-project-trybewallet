import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };
  }

  render() {
    return (
      <main className="login-container">
        <h2>Login</h2>
        <form className="login-fields">
          <input
            type="email"
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            required
          />
          <input
            type="password"
            data-testid="password-input"
            min="6"
            placeholder="Crie sua senha"
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </main>
    );
  }
}

export default Login;
