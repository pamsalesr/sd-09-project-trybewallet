import React from 'react';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
      },
      loginDisabled: false,
      invalidEmail: true,
      invalidPass: true,
    };
    this.validateFields = this.validateFields.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
  };

  validateFields() {
    const rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  }

  redirectPage() {
    this.props.history.push("/carteira");
  }

  showStuff() {

  }

  render() {
    const { loginDisabled, invalidEmail, invalidPass } = this.state;
    return (
      <main>
        <form>
          <h1>Trybe Wallet</h1>
          <label htmlFor="user">
            usuário:
            <input
              data-testid="email-input"
              type="text"
              name="user"
              onChange={ this.validateFields }
            />
            {invalidEmail && <span className="invalid">Insira um email valido</span>}
          </label>
          <label htmlFor="password">
            senha:
            <input
              data-testid="password-input"
              type="text"
              name="password"
              onChange={ this.validateFields }
            />
            {invalidEmail
              && <span className="invalid">Senha de pelo menos 6 caracteres</span>}
          </label>
          <button
            type="button"
            disabled={ loginDisabled }
            onClick={ () => { this.redirectPage(); } }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
