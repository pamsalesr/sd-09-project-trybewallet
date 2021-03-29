import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { handleUserLogin as loginAction } from '../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disableLoginBtn: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  validateFields() {
    const { email, password, disableLoginBtn } = this.state;
    const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const PASSWORD_LENGTH = 6;
    if (EMAIL_REGEX.test(email) && password.length >= PASSWORD_LENGTH) {
      this.setState({ disableLoginBtn: false });
    } else if (!disableLoginBtn) {
      this.setState({ disableLoginBtn: true });
    }
  }

  handleChange(e) {
    const { value, type } = e.target;
    this.setState(
      { [type]: value },
      () => (this.validateFields()),
    );
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const { handleUserLogin } = this.props;
    const { email } = this.state;
    handleUserLogin(email);
  }

  render() {
    const { email, password, disableLoginBtn } = this.state;

    return (
      <form onSubmit={ this.handleLoginSubmit }>
        <label htmlFor="email-input">
          Email
          <input
            type="email"
            id="email-input"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            type="password"
            id="password-input"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
          />
        </label>
        <button type="submit" disabled={ disableLoginBtn }>Entrar</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleUserLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = { handleUserLogin: func.isRequired };

export default connect(null, mapDispatchToProps)(Login);
