import React from 'react';
import { Link } from 'react-router-dom'
import { MdAccountCircle } from 'react-icons/md';

import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="container-login">
        <form className="form-login" action="">
          <MdAccountCircle size={ 80 } />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            pattern="^\w*(\.\w*)?@\w*\.[a-z]+(\.[a-z]+)?$"
            data-testid="email-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            minLength="6"
            data-testid="password-input"
            required
          />
          <Link to="/carteira" >
            <button className="btn-login" type="submit" >Entrar</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
