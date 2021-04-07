import '../styles/Login.css';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { isLoggedIn, addUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      users: [{ user: 'alguem@email.com', pass: '123456' }],
      redirect: false,
      disableButton: true,
    };

    this.activateButton = this.activateButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.inputs = this.inputs.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  activateButton() {
    const { users, email, password } = this.state;
    if (users.some((user) => (user.user === email && user.pass === password))) {
      const btn = document.getElementById('enter');
      btn.disabled = false;
    }
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.validateInput();
  }

  validateInput() {
    const { email, password } = this.state;
    const minLength = 5;
    // Font: https://ui.dev/validate-email-address-javascript/
    const validEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const validPassword = (password.length >= minLength);
    if (validEmail && validPassword) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }

  handleClick() {
    const { users, email, password } = this.state;
    const { isLoggedInDispatcher, addUserDispatcher } = this.props;
    if (users.some((user) => (user.user === email && user.pass === password))) {
      this.setState({ redirect: true });
      isLoggedInDispatcher();
      addUserDispatcher(email);
    } else {
      this.setState({ disableButton: true });
    }
  }

  inputs(name, value, data, ...params) {
    const [place, minLength] = params;
    return (
      <input
        className={ name }
        data-testid={ data }
        id={ name }
        name={ name }
        onChange={ this.handleInputChange }
        placeholder={ place }
        type={ name }
        value={ value }
        minLength={ minLength }
      />
    );
  }

  render() {
    const { email, password, redirect, disableButton } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    this.activateButton();
    return (
      <div>
        <header className="header">
          <h1 className="title">Trybe Wallet</h1>
        </header>
        <form className="form">
          <fieldset className="fieldset">
            <legend className="legend">Login</legend>
            <label htmlFor="email" className="label">
              Email:
              { this.inputs('email',
                email,
                'email-input',
                'Digite seu email') }
            </label>
            <label htmlFor="password" className="label">
              Senha:
              { this.inputs('password',
                password,
                'password-input',
                'Digite sua senha',
                '6')}
            </label>
            <button
              className="enter"
              id="enter"
              onClick={ this.handleClick }
              type="button"
              disabled={ disableButton }
            >
              Entrar
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isLoggedInDispatcher: () => dispatch(isLoggedIn()),
  addUserDispatcher: (email) => dispatch(
    addUser(email),
  ),
});

Login.propTypes = {
  isLoggedInDispatcher: func,
  addUserDispatcher: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
