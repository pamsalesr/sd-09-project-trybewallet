import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonStatus: true,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleEmail({ target }) {
    const { value } = target;
    const regex = /\S+@\S+\.\S+/; // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    if (regex.test(value)) {
      this.setState({ email: value });
    } else this.setState({ email: '', buttonStatus: true });
  }

  handlePassword({ target }) {
    const { value } = target;
    const { email } = this.state;
    const min = 6;
    if (email.length > 0 && value.length >= min) {
      this.setState({ password: value, buttonStatus: false });
    } else this.setState({ password: '', buttonStatus: true });
  }

  submitLogin() {
    const { email, password } = this.state;
    console.log(`Login: ${email} senha: ${password}`);
  }

  render() {
    const { buttonStatus } = this.state;
    return (
      <div>
        <div><h1>TrybeWallet</h1></div>
        <input
          data-testid="email-input"
          type="text"
          placeholder="e-mail"
          onChange={ this.handleEmail }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="password"
          onChange={ this.handlePassword }
        />
        <button
          type="button"
          disabled={ buttonStatus }
          onClick={ this.submitLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
