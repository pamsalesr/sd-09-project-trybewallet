import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.redirectToWallet = this.redirectToWallet.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  //  https://dev.to/ebraimcarvalho/a-simple-way-to-redirect-react-router-dom-5hnn
  async redirectToWallet() {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;

    return (
      <main className="login-container">
        <h2>Login</h2>
        <form className="login-fields">
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            onChange={ this.handleChange }
            required
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            minLength="6"
            placeholder="Crie sua senha"
            onChange={ this.handleChange }
            required
          />
          <button
            type="button"
            disabled={ email === '' || password === '' }
            onClick={ this.redirectToWallet }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
