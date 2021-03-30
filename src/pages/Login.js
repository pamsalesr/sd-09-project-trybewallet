import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin, userAdd } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', pass: '', btnLogin: true };
    this.handleChange = this.handleChange.bind(this);
    this.validateButtonLogin = this.validateButtonLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value },
    () => this.validateButtonLogin());
  }

  validateButtonLogin() {
    // expressão regex para email/senha (xEmail , xPass); reajustadas de acordo com o solicitado em projeto
    // obtida em: https://qastack.com.br/programming/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

    const { email, pass } = this.state;
    let btnLoginBoolKey = false;
    const regexEmail = /[a-z0-9]+@[a-z]+.[a-z]{2,}$/g;
    const regexPass = /[a-z0-9]{6,}$/;

    if (!(regexEmail.test(email) && regexPass.test(pass))) btnLoginBoolKey = true;
    this.setState({ btnLogin: btnLoginBoolKey });
  }

  render() {
    const { email, btnLogin } = this.state;
    const { userLoginSubmit } = this.props;
    return (
      <div>
        <h1>TRYBEWALLET</h1>
        <h2>Login</h2>
        <label htmlFor="email">
          User:
          <input
            id="email"
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="pass">
          Password:
          <input
            id="pass"
            name="pass"
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <div>
          <Link to="/carteira">
            <button
              type="submit"
              disabled={ btnLogin }
              onClick={ () => userLoginSubmit(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLoginSubmit: (email) => dispatch(userLogin(email)),
  handleSubmitNewUser: (newData) => dispatch(userAdd(newData)),
});

Login.propTypes = {
  baseDataEmails: PropTypes.arrayOf(PropTypes.string),
  userLoginSubmit: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
