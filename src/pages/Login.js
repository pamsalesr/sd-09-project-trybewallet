import React from 'react';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <label htmlFor="email-input">
            Email
            <input
              type="text"
              data-testid="email-input"
              placeholder="Insira o seu e-mail"
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input type="password" data-testid="password-input" />
          </label>
          <Button>Entrar</Button>
        </Link>
      </div>
    );
  }
}

export default Login;
