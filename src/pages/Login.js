import { Button, TextField } from '@material-ui/core';
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateLoginFields = this.validateLoginFields.bind(this);
  }

  validateLoginFields(email, password) {
    const re = /[^@]+@[^.]+\..+/g;
    const minimumPasswordLength = 6;
    const emailTest = re.test(String(email).toLowerCase());
    const passwordTest = password.length >= minimumPasswordLength;
    console.log(emailTest);
    console.log(passwordTest);
    return emailTest && passwordTest;
  }

  handleInputChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    const joinButton = this.validateLoginFields(email, password)
      ? <Button>Entrar</Button> : <Button disabled>Entrar</Button>;
    return (
      <div>
        <TextField
          id="input-email"
          name="email"
          label="Login"
          data-testid="email-input"
          variant="outlined"
          type="email"
          value={ email }
          onChange={ this.handleInputChange }
        />
        <TextField
          id="input-password"
          name="password"
          label="Senha"
          data-testid="password-input"
          variant="outlined"
          type="password"
          value={ password }
          onChange={ this.handleInputChange }
        />
        {joinButton}
      </div>
    );
  }
}

export default Login;
