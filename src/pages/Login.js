import React from 'react';
import './Login.css'

class Login extends React.Component {
  render() {
    return (
      <main>
        <h1>Trybe Wallet</h1>
        <form action="">
          <label for="user">
            user:
            <input data-testid="email-input" type="text" name="user" id="" />
          </label>
          <label for="password">
            password:
            <input data-testid="password-input" type="text" name="password" id="" />
          </label>
          <button type="submit">Entrar</button>
        </form>
      </main>
    );
  }
}

export default Login;
