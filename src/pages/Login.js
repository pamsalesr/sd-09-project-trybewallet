import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      isFilled: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyLoginFields = this.verifyLoginFields.bind(this);
  }

  verifyLoginFields() {
    const { email } = this.state;
    return email === ''
      ? this.setState({ isFilled: false })
      : this.setState({ isFilled: true });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { isFilled } = this.state;
    return (
      <main className="login-container">
        <h2>Login</h2>
        <form className="login-fields">
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            required
            onChange={ this.handleChange }
          />
          <input
            type="password"
            data-testid="password-input"
            minLength="6"
            placeholder="Crie sua senha"
            required
            onChange={ this.verifyLoginFields }
          />
          <Link to="/carteira">
            {
              isFilled
                ? <button type="submit">Entrar</button>
                : <button type="submit" disabled>Entrar</button>
            }
          </Link>
        </form>
      </main>
    );
  }
}

export default Login;
