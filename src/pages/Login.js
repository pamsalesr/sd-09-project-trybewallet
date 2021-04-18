import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newUser from '../actions/index';

const VALID_LENGTH_PASSWORD = 6;
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  loginUser() {
    const { newUser: addUserDispatch, history } = this.props;
    const { email } = this.state;
    addUserDispatch({ email });
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const REGEX_EMAIL = /\S+@\S+\.\S+/gi;
    const isValidEmail = email ? REGEX_EMAIL.test(email) : false;
    const isValidPassword = password.length >= VALID_LENGTH_PASSWORD;

    return (
      <>
        <input
          type="email"
          name="email"
          onChange={ this.handleInputChange }
          data-testid="email-input"
          placeholder="E-mail"
        />
        <input
          name="password"
          onChange={ this.handleInputChange }
          type="password"
          data-testid="password-input"
          placeholder="Senha"
        />
        <button
          type="button"
          disabled={ !(isValidEmail && isValidPassword) }
          onClick={ () => this.loginUser() }
        >
          Entrar
        </button>
      </>
    );
  }
}

const mapDispatchToProps = {
  newUser,
};

Login.propTypes = {
  newUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
