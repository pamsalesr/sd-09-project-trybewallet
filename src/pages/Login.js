import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validated: true,
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateInfo = this.validateInfo.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateInfo());
  }

  validateInfo() {
    const { email, password } = this.state;
    // https://github.com/tryber/sd-09-project-trivia-react-redux/pull/138
    const emailValidated = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(email);
    // https://pt.stackoverflow.com/questions/373574/regex-para-senha-forte
    const passwordValidated = /^(?=.*\d)[0-9a-zA-Z$*&@#]{6,}$/.test(password);
    if (emailValidated && passwordValidated) {
      this.setState({
        validated: false,
      });
    } else {
      this.setState({
        validated: true,
      });
    }
  }

  render() {
    const { validated } = this.state;
    return (
      <main>
        <h3>Login</h3>
        <input
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
          placeholder="Endereço de e-mail"
          type="email"
        />
        <input
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
          placeholder="Senha"
          type="password"
        />
        <button
          type="submit"
          disabled={ validated }
        >
          Entrar
        </button>
      </main>
    );
  }
}

export default Login;
