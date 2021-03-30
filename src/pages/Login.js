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
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  validateFields({ target }) {
    const { name, value } = target;
    const emailRegularEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let authorize = false;
    const passwordLength = 6;
    console.log(target);
    switch (name) {
    case 'email':
      authorize = emailRegularEx.test(value);
      this.setState({ auth: authorize });
      this.handleChange(name, value);
      return authorize;
    case 'password':
      authorize = value.length >= passwordLength;
      this.setState({ auth: authorize });
      this.handleChange(name, value);
      return authorize;
    default:
      return authorize;
    }
  }

  render() {
    const { loginDispatch } = this.props;
    console.log(loginDispatch);
    const { auth } = this.state;
    const errorMessage = <p className="error-message">Insira Email e Senha corretamente</p>;
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
