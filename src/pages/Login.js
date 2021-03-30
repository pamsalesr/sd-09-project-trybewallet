import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.inputs = this.inputs.bind(this);
    this.validateInputs = this.validateInputs.bind(this);

    this.state = {
      email: '',
      senha: '',
      button: true,
    };
  }

  inputs(event) {
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    }, () => this.validateInputs());
  }

  validateInputs() {
    const { email, senha } = this.state;
    const regex = /[a-zA-Z0-9\-_.]+@[a-zA-Z0-9]+.[a-z]+$/gm.test(email);
    const password = 6;
    if (regex && senha.length >= password) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  render() {
    const { button } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="Email">
            Email:
            <input
              onChange={ this.inputs }
              type="text"
              name="email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="Senha">
            Senha:
            <input
              onChange={ this.inputs }
              type="text"
              name="senha"
              data-testid="password-input"
            />
          </label>
        </form>
        <button type="button" name="button" disabled={ button }>Entrar</button>
      </div>
    );
  }
}

export default Login;
