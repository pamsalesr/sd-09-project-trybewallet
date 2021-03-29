import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import loginAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userEmail: '',
      userPassword: '',
      buttonDisabled: true,
      redirectToWallet: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.confirmLogin = this.confirmLogin.bind(this);
  }

  validateFields() {
    const { userEmail, userPassword } = this.state;
    const emailValidation = userEmail.includes('@') && userEmail.includes('.com');
    const minPasswordLength = 6;
    const passwordValidation = userPassword.length >= minPasswordLength;
    if (emailValidation && passwordValidation) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
    // emailValidation && passwordValidation
    //   ? this.setState({ buttonDisabled: false })
    //   : this.setState({ buttonDisabled: true });
  }

  handleInput({ target }) {
    const { name, value } = target;
    if (name === 'userEmail') {
      this.setState({ userEmail: value }, this.validateFields);
    } else {
      this.setState({ userPassword: value }, this.validateFields);
    }
    // name === 'userEmail'
    //   ? this.setState({ userEmail: value }, this.validateFields)
    //   : this.setState({ userPassword: value }, this.validateFields);
  }

  confirmLogin() {
    const { userEmail } = this.state;
    const { loginDispatch } = this.props;
    loginDispatch(userEmail);
    this.setState({ redirectToWallet: true });
  }

  render() {
    const { userEmail, userPassword, redirectToWallet, buttonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          E-mail:
          <input
            data-testid="email-input"
            name="userEmail"
            value={ userEmail }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="password-input"
            name="userPassword"
            value={ userPassword }
            onChange={ this.handleInput }
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.confirmLogin }
        >
          Entrar
        </button>
        { redirectToWallet ? <Redirect to="/carteira" /> : null}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
