import React from 'react';
import { connect } from 'react-redux';
import { user } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidPass: false,
      invalidEmail: false,
      email: '',
      password: '',
    };

    this.validateFields = this.validateFields.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
    this.loginEnabled = this.loginEnabled.bind(this);
  }

  validateFields() {
    const { email } = this.state;
    const rgxEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minimumPasswordLength = 6;
    const password = document.querySelector('#input-senha');

    if (email.match(rgxEmail)) {
      this.setState({ invalidEmail: false });
    } else {
      this.setState({ invalidEmail: true });
    }

    if (password.value.length >= minimumPasswordLength) {
      this.setState({ invalidPass: false });
    } else {
      this.setState({ invalidPass: true });
    }
  }

  loginEnabled() {
    const { email, password, invalidPass, invalidEmail } = this.state;
    if (email === '' && password === '') {
      return true;
    }
    return (invalidPass || invalidEmail);
  }

  redirectPage() {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { invalidEmail, invalidPass } = this.state;
    return (
      <main>
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
                this.setState({ email: event.target.value });
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
                this.setState({ password: event.target.value });
              } }
            />
            {invalidPass
              && <span className="invalid">Senha de pelo menos 6 caracteres</span>}
          </label>
          <button
            type="button"
            disabled={ this.loginEnabled() }
            onClick={ () => {
              this.redirectPage();
              // this.props.user({ email });
            } }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   login: (event) => dispatch(user(event)),
// });
// connect(null, mapDispatchToProps)();

export default Login;
