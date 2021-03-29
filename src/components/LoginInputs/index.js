import React from 'react';
import { connect } from 'react-redux';

class LoginInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginWallet: false,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputs({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    return '';
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <div>
          <span>E-mail: </span>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleInputs }
          />
        </div>
        <div>
          <span>Senha : </span>
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            // minLength="6"
            onChange={ this.handleInputs }
          />
        </div>
        <button
          type="submit"
          // Prop "pattern" abaixo tirado do site:
          // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_email_pattern
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default connect(null, null)(LoginInput);
