import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      invalidEmail: true,
      invalidPassword: true,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.validateBtnLogin = this.validateBtnLogin.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  changeHandler({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.validateBtnLogin(); });
  }

  validateBtnLogin() {
    const minimumPasswordCharacters = 6;
    const { email, password } = this.state;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.match(regexEmail)) {
      this.setState({ invalidEmail: false });
    } else {
      this.setState({ invalidEmail: true });
    }

    if (password.length < minimumPasswordCharacters) {
      this.setState({ invalidPassword: true });
    } else {
      this.setState({ invalidPassword: false });
    }
  }

  enableButton() {
    const { email, password, invalidEmail, invalidPassword } = this.state;
    if (password === '' && email === '') return true;
    return (invalidEmail || invalidPassword);
  }

  render() {
    const { email, password } = this.state;
    const { doFormLogin } = this.props;
    return (
      <main>
        <h1>Login</h1>
        <input
          data-testid="email-input"
          type="email"
          value={ email }
          name="email"
          placeholder="Email"
          onChange={ (event) => { this.changeHandler(event); } }
        />
        <input
          data-testid="password-input"
          type="password"
          value={ password }
          name="password"
          placeholder="Senha"
          onChange={ (event) => { this.changeHandler(event); } }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ this.enableButton() }
            onClick={ () => {
              doFormLogin({ email, password });
            } }
          >
            Entrar
          </button>
        </Link>

      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userPassword: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  doFormLogin: (obj) => dispatch(doLogin(obj)),
});

Login.propTypes = {
  doFormLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
