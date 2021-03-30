import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser as addUsers } from '../actions';
import './Login.css';
import Illustration from '../images/wallet.svg';

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
        <section className="container-illustration">
          <img className="illustration-img" src={ Illustration } alt="Illustration" />
          <h1 className="title-login-page">Trybe Wallet</h1>
        </section>
        <form className="container-form">
          <h1 className="title-login-input">Welcome to Trybe Wallet</h1>
          <section className="container-inputs">
            <input
              className="input-email"
              type="text"
              name="email"
              data-testid="email-input"
              placeholder="Email address"
              onChange={ this.handleChange }
              value={ email }
            />
            <input
              className="input-password"
              type="password"
              name="password"
              data-testid="password-input"
              placeholder="Password"
              onChange={ this.handleChange }
              value={ password }
            />
            <button
              className="btn-login"
              type="button"
              onClick={ () => this.redirectToWallet() || addUser(email, password) }
              disabled={ !validateUser }
            >
              Login
            </button>
          </section>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (email, password) => dispatch(addUsers(email, password)),
});

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
