import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
    };

    this.checkLoginInfo = this.checkLoginInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  checkLoginInfo() {
    const { user: { password } } = this.state;
    const minPswLength = 4;
    const loginButton = document.getElementById('login-button');

    if (password.length > minPswLength && this.validateEmail()) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  }

  // https://ui.dev/validate-email-address-javascript/
  // usei como referência este site para implementar uma validação
  // básica de email;

  validateEmail() {
    const { user: { email } } = this.state;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((previousState) => ({
      user: {
        ...previousState.user,
        [name]: value,
      },
    }));
    this.checkLoginInfo();
  }

  render() {
    const { execLogin } = this.props;
    const { user } = this.state;
    return (
      <form>
        <input
          data-testid="email-input"
          id="user-email"
          name="email"
          type="email"
          placeholder="email@email.com"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          data-testid="password-input"
          id="user-password"
          name="password"
          type="password"
          placeholder="senha"
          onChange={ (event) => this.handleChange(event) }
        />
        <Link to="/carteira" onClick={ () => execLogin(user.email) }>
          <button
            name="login"
            id="login-button"
            type="button"
            disabled
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  execLogin: (userEmail) => (
    dispatch(loginAction(userEmail))
  ),
});

Login.propTypes = {
  execLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
