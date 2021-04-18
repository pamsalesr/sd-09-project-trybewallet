import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isValidEmail: false,
      isValidPassword: false,
    };
  }

  handleInputEmailChange({ target: value }) {
    this.setState({ email: value });
  }

  render() {
    const { isValidEmail, isValidPassword } = this.state;
    return (
      <>
        <input type="email" data-testid="email-input" placeholder="E-mail" />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
        />
        <button type="button" disabled={ !(isValidEmail && isValidPassword) }>
          Entrar
        </button>
      </>
    );
  }
}

export default Login;
