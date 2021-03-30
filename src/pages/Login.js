import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authLogin } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      auth: false,
      isEmailValid: true,
      isPasswordValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  checkAuth(isEmailValid, isPasswordValid) {
    const auth = isEmailValid && isPasswordValid;
    this.setState({ auth });
  }

  validateFields({ target }) {
    const { name, value } = target;
    let { isEmailValid, isPasswordValid } = this.state;
    const emailRegularEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordLength = 6;
    switch (name) {
    case 'email':
      isEmailValid = emailRegularEx.test(value);
      this.checkAuth(isEmailValid, isPasswordValid);
      this.setState({ isEmailValid });
      this.handleChange(name, value);
      return isEmailValid;
    case 'password':
      isPasswordValid = value.length >= passwordLength;
      this.checkAuth(isEmailValid, isPasswordValid);
      this.setState({ isPasswordValid });
      this.handleChange(name, value);
      return isPasswordValid;
    default:
      return 'Error';
    }
  }

  render() {
    const { loginDispatch } = this.props;
    console.log(loginDispatch);
    const { auth, isEmailValid, isPasswordValid } = this.state;
    const isFieldsValid = isEmailValid && isPasswordValid;
    const errorMessage = isFieldsValid ? ''
      : <p className="error-message">Email ou Senha incorretos</p>;
    return (
      <section id="Login">
        <header className="main-header">
          <h1>Hello, TrybeWallet!</h1>
        </header>
        <div className="box-login">
          <h2 className="secondary-heading">Login</h2>
          <div className="textbox">
            <i className="fas fa-user" aria-hidden="true" />
            <input
              type="text"
              name="email"
              className="input"
              onChange={ this.validateFields }
              placeholder="Email"
              data-testid="email-input"
            />
          </div>
          <div className="textbox">
            <i className="fas fa-lock" aria-hidden="true" />
            <input
              type="password"
              name="password"
              className="input"
              onChange={ this.validateFields }
              placeholder="Password"
              data-testid="password-input"
            />
          </div>
          <input
            type="button"
            disabled={ !auth || '' }
            value="Entrar"
            className="input input-text"
            onMouseDown={ this.auth }
            onClick={ () => loginDispatch(this.state) }
          />
          { auth ? '' : errorMessage}
        </div>
      </section>
    );
  }
}
Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (state) => dispatch(authLogin(state)) });
export default connect(null, mapDispatchToProps)(Login);
