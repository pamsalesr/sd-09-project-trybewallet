import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: false,
      isPasswordValid: false,
      password: '',
      email: '',
      shouldRedirectToCarteira: false,
    };
  }

  isFormInvalid() {
    const { isEmailValid, isPasswordValid } = this.state;
    return !isEmailValid || !isPasswordValid;
  }

  handleEmailInput({ target }) {
    const { value } = target;
    const emailRegex = /.+@.+\..+/;
    const isEmailValid = emailRegex.test(value);
    this.setState({ email: value, isEmailValid });
  }

  handlePasswordInput({ target }) {
    const { value } = target;
    const minPasswordCharacters = 6;
    const isPasswordValid = value.length >= minPasswordCharacters;
    this.setState({ password: value, isPasswordValid });
  }

  login() {
    const { email } = this.state;
    const { setEmail } = this.props;
    setEmail(email);
    this.setState({ shouldRedirectToCarteira: true });
  }

  render() {
    const { email, password, shouldRedirectToCarteira } = this.state;
    if (shouldRedirectToCarteira) return <Redirect to="/carteira" />;
    return (
      <form>
        <label htmlFor="email-input">
          <input
            value={ email }
            onChange={ (ev) => this.handleEmailInput(ev) }
            data-testid="email-input"
            id="email-input"
            name="email"
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            id="password-input"
            name="password"
            type="password"
            value={ password }
            onChange={ (ev) => this.handlePasswordInput(ev) }
          />
        </label>
        <button
          disabled={ this.isFormInvalid() }
          onClick={ () => this.login() }
          type="button"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(actions.setEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
