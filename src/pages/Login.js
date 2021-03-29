import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: false,
      isPasswordValid: false,
      password: '',
      email: '',
    };
  }

  isFormInvalid() {
    const { isEmailValid, isPasswordValid } = this.state;
    return !isEmailValid || !isPasswordValid;
  }

  handleEmailInput({ target }) {
    const { value } = target;
    const emailRegex = /.+@.+\..+/;
    const isEmailValid = emailRegex.test(value);
    this.setState({ email: value, isEmailValid });
  }

  handlePasswordInput({ target }) {
    const { value } = target;
    const minPasswordCharacters = 6;
    const isPasswordValid = value.length >= minPasswordCharacters;
    this.setState({ password: value, isPasswordValid });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          <input
            value={ email }
            onChange={ (ev) => this.handleEmailInput(ev) }
            data-testid="email-input"
            id="email-input"
            name="email"
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            id="password-input"
            name="password"
            type="password"
            value={ password }
            onChange={ (ev) => this.handlePasswordInput(ev) }
          />
        </label>
        <button disabled={ this.isFormInvalid() } type="button">Entrar</button>
      </form>
    );
  }
}

export default Login;
