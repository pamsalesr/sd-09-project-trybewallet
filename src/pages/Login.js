import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router';
import { doLogin } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidPass: false,
      invalidEmail: false,
      buttonDisabled: true,
      loggedIn: false,
      email: '',
      password: '',
    };

    this.validateFields = this.validateFields.bind(this);
    this.setLogOn = this.setLogOn.bind(this);
    this.loginEnabled = this.loginEnabled.bind(this);
  }

  setLogOn() {
    this.setState({ loggedIn: true });
  }

  validateFields() {
    const { email, password } = this.state;
    const rgxEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const rgxPass = /\d{6,}/;

    if (email.match(rgxEmail)) {
      this.setState({ invalidEmail: false }, () => { this.loginEnabled(); });
    } else {
      this.setState({ invalidEmail: true }, () => { this.loginEnabled(); });
    }

    if (password.match(rgxPass)) {
      this.setState({ invalidPass: false }, () => { this.loginEnabled(); });
    } else {
      this.setState({ invalidPass: true }, () => { this.loginEnabled(); });
    }
  }

  loginEnabled() {
    const { email, password, invalidPass, invalidEmail } = this.state;
    if (email === '' && password === '') {
      return this.setState({ buttonDisabled: true });
    }

    this.setState({ buttonDisabled: invalidPass || invalidEmail });
  }

  render() {
    const { invalidEmail, invalidPass, loggedIn, email, buttonDisabled } = this.state;
    const { login } = this.props;
    return (
      loggedIn ? <Redirect to="/carteira" />
        : (
          <main className="login-screen">
            <form>
              <h1>Trybe Wallet</h1>
              <label htmlFor="user">
                usuário:
                <input
                  data-testid="email-input"
                  type="text"
                  name="user"
                  onChange={ (event) => {
                    this.validateFields();
                    this.setState({ email: event.target.value },
                      () => { this.validateFields(); });
                  } }
                />
                {invalidEmail && <span className="invalid">Insira um email valido</span>}
              </label>
              <label htmlFor="password">
                senha:
                <input
                  data-testid="password-input"
                  id="input-senha"
                  type="password"
                  name="password"
                  onChange={ (event) => {
                    this.validateFields();
                    this.setState({ password: event.target.value },
                      () => { this.validateFields(); });
                  } }
                />
                {invalidPass
                  && <span className="invalid">Senha de pelo menos 6 caracteres</span>}
              </label>
              <button
                type="button"
                disabled={ buttonDisabled }
                onClick={ () => { this.setLogOn(); login({ email }); } }
              >
                Entrar
              </button>
            </form>
          </main>)
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (event) => dispatch(doLogin(event)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
