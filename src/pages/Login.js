import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      auth: true,
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
    const { auth } = this.state;
    const errorMessage = <p className="error-message">Email ou senha incorretos</p>;
    return (
      <section id="Login">
        <header className="main-header">
          <h2>Hello, TrybeWallet!</h2>
        </header>
        <h2 className="secondary-heading">Login</h2>
        <div className="login-box">
          <form>
            <input
              type="text"
              name="email"
              onChange={ this.validateFields }
              placeholder="Email"
              data-testid="email-input"
            />
            <input
              type="password"
              name="password"
              onChange={ this.validateFields }
              placeholder="Password"
              data-testid="password-input"
            />
            <button type="submit" onClick={ loginDispatch(this.state) }>Entrar</button>
            { auth ? '' : errorMessage}
          </form>
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
