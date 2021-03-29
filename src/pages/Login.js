import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validEmail: false,
      password: '',
      validPassword: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.validLogin = this.validLogin.bind(this);
    this.saveLogin = this.saveLogin.bind(this);
  }

  handleLogin({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validLogin(name, value);
  }

  validLogin(name, value) {
    const email = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const password = new RegExp(/[\w\D]{6}/g);
    if (name === 'email') {
      this.setState({
        validEmail: email.test(value),
      });
    }
    if (name === 'password') {
      this.setState({
        validPassword: password.test(value),
      });
    }
  }

  saveLogin() {
    const { dispatchLogin } = this.props;
    const { email } = this.state;
    dispatchLogin(email);
  }

  render() {
    const { email, password, validEmail, validPassword } = this.state;
    const validLogin = (validEmail && validPassword);
    return (
      <div>
        <h1>Login</h1>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="email-input"
            type="text"
            name="email"
            onChange={ this.handleLogin }
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="text"
            name="password"
            data-testid="password-input"
            onChange={ this.handleLogin }
            value={ password }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !validLogin }
            onClick={ this.saveLogin }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (email) => dispatch(saveLogin(email)),
});

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
