import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      redirect: false,
    };
    this.inputsLogin = inputsLogin.bind(this);
  }

  verifyLogin() {
    const { email, senha } = this.state;
    const senhaLength = 6;
    if (email === 'alguem@alguem.com' && senha >= senhaLength) {
      this.setState({ redirect: true });
    }
  }

  handleInputsChange({ targe: { name, value } }) {
    this.setState({ [name]: value });
  }

  inputsLogin(labelName, id, name, ...params) {
    const [type, valueName] = params;
    return (
      <label htmlFor={ id }>
        {labelName}
        <input
          type={ type }
          data-testid={ id }
          value={ valueName }
          name={ name }
          onChange={ this.handleInputsChange }
        />
      </label>
    );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <forms>
        <Link to="/" />
        { this.inputsLogin(
          'Email',
          '"email-input"',
          'email-input',
          'email',
          email,
        )}
        { this.inputsLogin(
          'Senha',
          '"password-input"',
          'password-input', 'password',
          password,
        )}
        <button type="button" onClick={ this.verifyLogin }>Entrar</button>
      </forms>
    );
  }
}

export default Login;
