import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import loginAction from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.validateEmail = this.validateEmail.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email: '',
      password: '',
      disableBtn: true,
    };
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleLogin() {
    const { email, password } = this.state;
    const validPassword = 6;

    if (this.validateEmail(email) && password.length >= validPassword) {
      this.setState({
        disableBtn: null,
      });
    } else {
      this.setState({
        disableBtn: true,
      });
    }
  }

  handleChangeEmail({ target }) {
    this.setState({
      email: target.value,
    }, () => {
      this.handleLogin();
    });
  }

  handleChangePassword({ target }) {
    this.setState({
      password: target.value,
    }, () => {
      this.handleLogin();
    });
  }

  render() {
    const { disableBtn, email } = this.state;
    const { dispatchEmail } = this.props;
    return (
      <div>
        <label htmlFor="email">
          Email
          {' '}
          <input
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChangeEmail }
          />
          {' '}
        </label>
        <label htmlFor="password">
          Senha
          {' '}
          <input
            type="password"
            data-testid="password-input"
            name="password"
            onChange={ this.handleChangePassword }
          />
        </label>
        {' '}
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disableBtn }
            onClick={ () => dispatchEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
