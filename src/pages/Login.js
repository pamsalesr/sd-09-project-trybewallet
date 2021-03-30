import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginAction from '../actions';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.getPasswordLength = this.getPasswordLength.bind(this);
    this.invalidPassword = this.invalidPassword.bind(this);
    this.invalidEmail = this.invalidEmail.bind(this);
    this.submitButton = this.submitButton.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.state = {
      email: '',
      validPassword: false,
      validEmail: false,
    };
  }

  getPasswordLength({ target }) {
    const { value } = target;
    const passwordLength = parseFloat(value.length);
    const requestedPasswordLength = 6;
    const { validPassword } = this.state;
    if (validPassword && passwordLength < requestedPasswordLength) {
      this.setState({
        validPassword: false,
      });
    }
    if (!validPassword && passwordLength >= requestedPasswordLength) {
      this.setState({
        validPassword: true,
      });
    }
  }

  invalidPassword() {
    const { validPassword } = this.state;
    if (!validPassword) {
      return <p className="alert">A senha deve possuir pelo menos 6 caracteres.</p>;
    }
  }

  invalidEmail() {
    const { validEmail } = this.state;
    if (!validEmail) {
      return <p className="alert">E-mail inválido!</p>;
    }
  }

  handleEmail({ target }) {
    const email = target.value;
    let { validEmail } = this.state;
    if (!validEmail && email.includes('@') && email.includes('.com')) {
      validEmail = true;
    }
    if (validEmail && (!email.includes('@') || !email.includes('.com'))) {
      validEmail = false;
    }
    this.setState({
      email,
      validEmail,
    });
  }

  submitButton() {
    const { validEmail, validPassword, email } = this.state;
    const { DispatchEmail } = this.props;
    const disabled = () => {
      if (validPassword && validEmail) { return false; }
      return true;
    };
    return (
      <Link to="/carteira">
        <button
          disabled={ disabled() }
          type="button"
          onClick={ () => DispatchEmail(email) }
        >
          Entrar
        </button>
      </Link>
    );
  }

  render() {
    const { getPasswordLength, invalidPassword,
      submitButton, handleEmail, invalidEmail } = this;
    return (
      <div className="main-div">
        <p className="trybe-wallet">TRYBE WALLET</p>
        <div className="login-div">
          <p className="login-message">Faça login para ter acesso à plataforma</p>
          <form>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                data-testid="email-input"
                onChange={ handleEmail }
              />
              { invalidEmail() }
            </label>
            <label htmlFor="password">
              Senha:
              <input
                type="password"
                id="password"
                data-testid="password-input"
                onChange={ getPasswordLength }
              />
              { invalidPassword() }
            </label>
            { submitButton()}
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  DispatchEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  DispatchEmail: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
