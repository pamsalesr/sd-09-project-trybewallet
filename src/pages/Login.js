import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userEmailAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isEmailValid: '',
      isPasswordValid: '',
    };
    this.inputValidate = this.inputValidate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validInput = this.validInput.bind(this);
  }

  inputValidate(name, value) {
    const isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    const validPassword = 6;
    switch (name) {
    case 'email':
      return isValid ? '' : 'Email inválido';
    case 'password':
      return value.length >= validPassword
        ? '' : 'A senha deve possuir pelo menos 6 caractéres';
    default:
      return '';
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      isEmailValid: name === 'email' && this.inputValidate(name, value),
      isPasswordValid: name === 'password' && this.inputValidate(name, value),
      [name]: value,
    });
  }

  validInput() {
    const { password, email } = this.state;
    const passwordlength = 6;
    const emailLength = 14;
    if (password.length >= passwordlength && email.length >= emailLength) {
      return false;
    }
  }

  userLogin() {
    const { email } = this.state;
    const { userEmail } = this.props;
    userEmail(email);
  }

  render() {
    const { email, isEmailValid, isPasswordValid } = this.state;
    const { userEmail } = this.props;
    let test = true;
    if (this.validInput() !== undefined) test = this.validInput();
    return (
      <section>
        <form>
          <label htmlFor="email-user">
            Email:
            <input
              onInput={ this.handleChange }
              id="email-user"
              name="email"
              type="text"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password-user">
            Senha:
            <input
              onInput={ this.handleChange }
              id="password-user"
              name="password"
              type="password"
              data-testid="password-input"
            />
          </label>
          <Link onClick={ () => userEmail(email) } to="/carteira">
            <button
              disabled={ test }
              onClick={ () => this.userLogin() }
              type="submit"
            >
              Entrar
            </button>
          </Link>
        </form>
        {isEmailValid && <p>{isEmailValid}</p>}
        {isPasswordValid && <p>{isPasswordValid}</p>}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(userEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

const { func } = propTypes;

Login.propTypes = {
  userEmail: func.isRequired,
};
