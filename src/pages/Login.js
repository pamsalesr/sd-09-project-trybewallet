import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../actions';

const passwordLength = 5;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validateUser: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.redirectToWallet = this.redirectToWallet.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.btnSend());
  }

  validateEmail(email) {
    // validação usando regex:
    /**
     * https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
     */
    // const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(email);
  }

  btnSend() {
    const { email, password, validateUser } = this.state;
    const emailIsValid = this.validateEmail(email);
    if (!validateUser && emailIsValid && password.length >= passwordLength) {
      console.log('is valid');
      this.validateLogin(true);
    } else if (validateUser && (!emailIsValid || password.length < passwordLength)) {
      this.validateLogin(false);
      console.log('is invalid');
    }
  }

  validateLogin(login) {
    this.setState({
      validateUser: login,
    });
  }

  redirectToWallet() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, password, validateUser, redirect } = this.state;
    const { addUser } = this.props;

    if (redirect) {
      return <Redirect push to="/carteira" />;
    }

    return (
      <main className="container-login">
        <form>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            type="button"
            onClick={ () => this.redirectToWallet() || addUser(email, password) }
            disabled={ !validateUser }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (email, password) => dispatch(addUser(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
