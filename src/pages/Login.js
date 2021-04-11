import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      enableButton: false,
      validPass: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { email, validPass } = this.state;

    if (event.target.name === 'email') {
      const validEmail = event.target.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
      this.setState({
        email: validEmail || '',
      });
    }
    if (event.target.name === 'password') {
      const maxPassLength = 6;
      const validatePass = event.target.value.length >= maxPassLength;

      this.setState({
        validPass: validatePass,
      });
    }

    const validButton = email ? (!!validPass) : false;
    this.setState({
      enableButton: validButton,
    });
  }

  render() {
    const { enableButton } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            name="email"
            type="email"
            onChange={ this.handleInputChange }
            ata-testid="email-input"
          />
          <input
            name="password"
            type="password"
            onChange={ this.handleInputChange }
            data-testid="password-input"
          />
          <Link to="/carteira">
            <button
              type="submit"
              disabled={ !enableButton }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>);
  }
}

export default Login;
