import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userEmailDispach from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validatedEmail: false,
      validatedPassword: false,
      disableBtn: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.credentialValidation = this.credentialValidation.bind(this);
    this.sendBtnClick = this.sendBtnClick.bind(this);
  }

  credentialValidation(target) {
    const { validatedEmail, validatedPassword } = this.state;
    const email = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const password = new RegExp(/[\w\D]{5}/g);
    if (target.name === 'email') {
      this.setState({ validatedEmail: email.test(target.value) });
    }
    if (target.name === 'password') {
      this.setState({ validatedPassword: password.test(target.value) });
    }
    if (validatedEmail === true && validatedPassword === true) {
      this.setState({ disableBtn: false });
    }
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
    this.setState({
      disableBtn: true,
    });
    this.credentialValidation(target);
  }

  sendBtnClick() {
    const { userEmailDispach } = this.props;
    const { email } = this.state;
    userEmailDispach(email);
  }

  render() {
    const { email, password, disableBtn } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Login:
          <input
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disableBtn }
            onClick={ this.sendBtnClick }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispach) => ({
  userEmailDispach: (email) => dispach(userEmailDispach(email)),
});

export default connect(null, mapDispatchToProps)(Login);
