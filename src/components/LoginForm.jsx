import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserEmail } from '../actions';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.redirectToWallet = this.redirectToWallet.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.validateFields();
  }

  validateFields() {
    const { email, password } = this.state;
    const minLength = 5;
    if (email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) && password.length >= minLength) {
      this.setState({ disabled: false });
      console.log(email, password);
    } else {
      this.setState({ disabled: true });
    }
  }

  //  https://dev.to/ebraimcarvalho/a-simple-way-to-redirect-react-router-dom-5hnn
  redirectToWallet() {
    const { userEmailDispatcher } = this.props;
    const { email } = this.state;
    userEmailDispatcher(email);
    const { history } = this.props;
    return history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;

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
            placeholder="Crie sua senha"
            onChange={ this.handleChange }
            required
          />
          <button
            type="button"
            disabled={ disabled }
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
  }),
  userEmailDispatcher: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  userEmailDispatcher: () => dispatch(getUserEmail()),
});

export default connect(null, mapDispatchToProps)(LoginForm);
