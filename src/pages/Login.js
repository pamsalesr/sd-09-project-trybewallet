import React from 'react';
import { MdAccountCircle } from 'react-icons/md';

import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="container-login">
        <form className="form-login" action="">
          <MdAccountCircle size={ 80 } />
          <input type="email" name="email" id="email" placeholder="E-mail" data-testid="email-input" />
          <input type="password" name="password" id="password" placeholder="Senha" data-testid="password-input" />
          <button type="button" >Enviar</button>
        </form>
      </div>
    );
  }
}

export default Login;
