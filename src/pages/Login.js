import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <>
        <div>Login</div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            placeholder="Usuário"
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
          />
          <input type="submit" value="Entrar" />
        </form>
      </>
    );
  }
}
