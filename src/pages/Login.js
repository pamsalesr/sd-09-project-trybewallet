import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      buttonValidation: true,
      emailValidation: false,
      senhaValidation: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
    this.inputValidation(target);
    this.handleButton();
  }

  inputValidation({ name, value }) {
    const emailRegex = new RegExp(/^[\w]+@[a-z]+.\w{2,3}/g);
    const senhaRegex = new RegExp(/^[\w]{6,}/g);
    if (name === 'email') {
      this.setState({
        emailValidation: emailRegex.test(value),
      });
    }
    if (name === 'senha') {
      this.setState({
        senhaValidation: senhaRegex.test(value),
      });
    }
  }

  handleButton() {
    const { emailValidation, senhaValidation } = this.state;
    if (emailValidation === true && senhaValidation === true) {
      this.setState({
        buttonValidation: false,
      });
    }
  }

  render() {
    const { email, senha, buttonValidation } = this.state;
    return (
      <div>
        Login
        <form>
          <label htmlFor="email">
            E-mail
            <input
              value={ email }
              name="email"
              onChange={ this.handleChange }
              data-testid="email-input"
              required
            />
          </label>
          <label htmlFor="senha">
            Password
            <input
              value={ senha }
              name="senha"
              onChange={ this.handleChange }
              data-testid="password-input"
              required
            />
          </label>
        </form>
        <Link to="/carteira">
          <button disabled={ buttonValidation } type="submit">
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
