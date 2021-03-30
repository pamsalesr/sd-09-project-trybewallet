import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../actions';
import './Login.css';

const PASSWORD_MINIMUM_LENGTH = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      passwordInput: '',
      formErrors: {
        emailInput: '',
        passwordInput: '',
      },
      typed: {
        emailInput: false,
        passwordInput: false,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((state) => ({
      ...state,
      [name]: value,
      formErrors: {
        ...state.formErrors,
        [name]: this.validateField(name, value),
      },
      typed: {
        ...state.typed,
        [name]: true,
      },
    }));
  }

  /* Validation found at: https://github.com/tryber/sd-09-live-lectures/tree/lecture/12.2 */
  validateField(fieldName, value) {
    const isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    switch (fieldName) {
    case 'emailInput':
      return isValid ? '' : 'Email is invalid';
    case 'passwordInput':
      return value.length >= PASSWORD_MINIMUM_LENGTH ? '' : 'Password is too short';
    default:
      break;
    }
    return '';
  }

  render() {
    const {
      emailInput,
      passwordInput,
      formErrors: { emailInput: emailError, passwordInput: passwordError },
      typed: { emailInput: emailTyped, passwordInput: passwordTyped },
    } = this.state;
    const { logIn } = this.props;
    return (
      <main>
        <div className="login-container">
          <h1>Trybe-Wallet</h1>
          <label htmlFor="email-input">
            Email:
            <input
              data-testid="email-input"
              type="text"
              id="email-input"
              name="emailInput"
              value={ emailInput }
              onChange={ this.handleChange }
              autoComplete="off"
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              id="password-input"
              name="passwordInput"
              value={ passwordInput }
              onChange={ this.handleChange }
              autoComplete="off"
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ !emailTyped || !passwordTyped || emailError || passwordError }
              onClick={ () => logIn(emailInput) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logIn: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
