import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { func } from 'prop-types';
import { handleEmail } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      desactivatedButton: true,
      redirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidateLogin = this.handleValidateLogin.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleInputChange({ name, value }) {
    this.setState((state) => ({
      ...state,
      [name]: value,
    }), () => this.handleValidateLogin());
  }

  handleValidateLogin() {
    const { email, password } = this.state;
    const validateEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const passwordLength = password.length;
    const minPasswordLength = 6;
    if (validateEmail.test(email) && passwordLength >= minPasswordLength) {
      this.setState({ desactivatedButton: false });
    } else {
      this.setState({ desactivatedButton: true });
    }
  }

  redirect() {
    const { emailDispatcher } = this.props;
    const { email } = this.state;
    this.setState({ redirect: true });
    emailDispatcher(email);
  }

  render() {
    const { desactivatedButton, redirect } = this.state;
    if (redirect) return (<Redirect to="/carteira" />);
    return (
      <div className="form-login">
        <h2>Login</h2>
        <form className="fieldset-login">
          <label htmlFor="email-input" className="label-login">
            E-mail:
            <input
              id="email-input"
              data-testid="email-input"
              type="email"
              name="email"
              onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              id="password-input"
              data-testid="password-input"
              type="password"
              name="password"
              minLength="6"
              onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </label>
          <button
            type="button"
            disabled={ desactivatedButton }
            onClick={ this.redirect }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProp = (dispatch) => ({
  emailDispatcher: (email) => dispatch(handleEmail(email)),
});

Login.propTypes = {
  emailDispatcher: func,
}.isRequired;

export default connect(null, mapDispatchToProp)(Login);
