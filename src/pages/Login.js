import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        Login
        <form>
          <input
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
          />
          <input
            type="submit"
            value="Entrar"
          />
        </form>
      </div>
    );
  }
}

export default Login;
